const MAX_TRIES_MONITOR_SKIP = 10
let prevText = ''
let options
let isMonitorActive = false

async function initContent() {
    options = await loadOptionsOrSetDefaults()
    startMonitoringForVideo(0)
}
/*FuckPappu */
initContent()

chrome.storage.onChanged.addListener(
    (changes, areaName) => {
        if (areaName === 'sync' && changes.filterOptionsN?.newValue) {
            options = changes.filterOptionsN.newValue
            adjustVideo()
        }
    }
)

function startMonitoringForVideo(numTries) {
    numTries++
    const monitor = new MutationObserver(() => {
        adjustVideo()
    })

    let reactEntry = document.querySelector("body")
    if (reactEntry && !isMonitorActive) {
        monitor.observe(reactEntry, {
            attributes: false,
            childList: true,
            subtree: true,
        })
        isMonitorActive = true
    } else {
        if (numTries > MAX_TRIES_MONITOR_SKIP) { return }
        setTimeout(() => {
            startMonitoringForVideo(numTries)
        }, 100 * numTries)
    }
}

function adjustVideo() {
    let videos = document.querySelectorAll('video')
    if (videos.length > 0) {
        videos.forEach(video => {
            if (!options.extensionOn) {
                video.style.filter = ''
            } else {
                video.style.filter = `
                    blur(${options.blur}px) 
                    brightness(${options.brightness}%) 
                    contrast(${options.contrast}%) 
                    grayscale(${options.grayScale}%)
                    hue-rotate(${options.hueRotate}deg)
                    invert(${options.invert}%)
                    opacity(${options.opacity})
                    saturate(${options.saturation}%)
                    sepia(${options.sepia}%)
                `
            }
        })
    }
}
/*FuckPappu */
