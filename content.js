/*FuckPappu */
// Mouse Wheel Volume Control With Youtube UI Sync
let options;
let isMonitorActive = false;
const attachedVideos = new WeakSet();

const MAX_TRIES_MONITOR_SKIP = 10;

async function initContent() {
    options = await loadOptionsOrSetDefaults();
    startMonitoringForVideo(0);
}

initContent();

chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync' && changes.filterOptionsN?.newValue) {
        options = changes.filterOptionsN.newValue;
        adjustVideo();
    }
});

function startMonitoringForVideo(numTries) {
    numTries++;
    const observer = new MutationObserver(adjustVideo);

    const body = document.querySelector("body");
    if (body && !isMonitorActive) {
        observer.observe(body, {
            childList: true,
            subtree: true
        });
        isMonitorActive = true;
    } else {
        if (numTries > MAX_TRIES_MONITOR_SKIP) return;
        setTimeout(() => startMonitoringForVideo(numTries), 100 * numTries);
    }
}
/*FuckPappu */
function adjustVideo() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (!options?.extensionOn) {
            video.style.filter = '';
        } else {
            video.style.filter = `
                blur(${options.blur || 0}px)
                brightness(${options.brightness || 100}%)
                contrast(${options.contrast || 100}%)
                grayscale(${options.grayScale || 0}%)
                hue-rotate(${options.hueRotate || 0}deg)
                invert(${options.invert || 0}%)
                opacity(${options.opacity ?? 1})
                saturate(${options.saturation || 100}%)
                sepia(${options.sepia || 0}%)
            `;
        }

        
        if (!attachedVideos.has(video)) {
            video.addEventListener('wheel', handleWheelVolume, { passive: false });
            attachedVideos.add(video);
        }
    });
}

function handleWheelVolume(e) {
    if (e.target !== this && !this.contains(e.target)) return;

    e.preventDefault();
    e.stopPropagation();

    const delta = Math.sign(e.deltaY);
    if (delta === 0) return;

    const step = 0.04; // 4% per scroll tick
    const newVolume = Math.max(0, Math.min(1, this.volume - delta * step));

    
    this.volume = newVolume;

    const volumePercent = Math.round(newVolume * 100);
    
    const code = `
        (function() {
            const player = document.querySelector('.html5-video-player');
            if (player?.setVolume) {
                player.setVolume(${volumePercent});
                // Extra force sync for stubborn cases
                setTimeout(() => player.setVolume(${volumePercent}), 40);
                setTimeout(() => player.setVolume(${volumePercent}), 150);
            }
        })();
    `;

    const script = document.createElement('script');
    script.textContent = code;
    (document.head || document.documentElement).appendChild(script);
    script.remove();
}

setInterval(() => {
    document.querySelectorAll('video').forEach(video => {
        if (!attachedVideos.has(video)) {
            video.addEventListener('wheel', handleWheelVolume, { passive: false });
            attachedVideos.add(video);
        }
    });
}, 2000);
/*FuckPappu */
