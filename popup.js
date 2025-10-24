/*FuckPappu */
const onOff = document.querySelector('#onOff')
const externalBtn = document.querySelector('#externalBtn')
const blurRange = document.querySelector('#blurRange')
const blurRangeOutput = document.querySelector('#blurRangeOutput')
const brightnessRange = document.querySelector('#brightnessRange')
const brightnessRangeOutput = document.querySelector('#brightnessRangeOutput')
const contrastRange = document.querySelector('#contrastRange')
const contrastRangeOutput = document.querySelector('#contrastRangeOutput')
const grayscaleRange = document.querySelector('#grayscaleRange')
const grayscaleRangeOutput = document.querySelector('#grayscaleRangeOutput')
const hueRotateRange = document.querySelector('#hueRotateRange')
const hueRotateRangeOutput = document.querySelector('#hueRotateRangeOutput')
const invertRange = document.querySelector('#invertRange')
const invertRangeOutput = document.querySelector('#invertRangeOutput')
const opacityRange = document.querySelector('#opacityRange')
const opacityRangeOutput = document.querySelector('#opacityRangeOutput')
const saturateRange = document.querySelector('#saturateRange')
const saturateRangeOutput = document.querySelector('#saturateRangeOutput')
const sepiaRange = document.querySelector('#sepiaRange')
const sepiaRangeOutput = document.querySelector('#sepiaRangeOutput')
const reset = document.querySelector('#reset')
const rangeButtons = document.querySelectorAll('.rangeButton')

let options

chrome.storage.onChanged.addListener(
    (changes, areaName) => {
        if (areaName === 'sync' && changes.filterOptionsN?.newValue) {
            options = changes.filterOptionsN.newValue
            setValues()
        }
    }
)

window.addEventListener('DOMContentLoaded', async () => {
    options = await loadOptionsOrSetDefaults()
    setValues()
})

function setValues() {
    onOff.textContent = `Extension: ${options.extensionOn ? 'On' : 'Off'}`
    onOff.classList.toggle('active', options.extensionOn)
    externalBtn.textContent = `External Button: ${options.externalBtn ? 'On' : 'Off'}`
    externalBtn.classList.toggle('active', options.externalBtn)
    blurRange.value = options.blur
    blurRangeOutput.textContent = Number(options.blur) + 'px'
    brightnessRange.value = options.brightness
    brightnessRangeOutput.textContent = Number(options.brightness) + '%'
    contrastRange.value = options.contrast
    contrastRangeOutput.textContent = Number(options.contrast) + '%'
    grayscaleRange.value = options.grayScale
    grayscaleRangeOutput.textContent = Number(options.grayScale) + '%'
    hueRotateRange.value = options.hueRotate
    hueRotateRangeOutput.innerHTML = Number(options.hueRotate) + '&deg;'
    invertRange.value = options.invert
    invertRangeOutput.textContent = Number(options.invert) + '%'
    opacityRange.value = options.opacity
    opacityRangeOutput.textContent = Number(options.opacity)
    saturateRange.value = options.saturation
    saturateRangeOutput.textContent = Number(options.saturation) + '%'
    sepiaRange.value = options.sepia
    sepiaRangeOutput.textContent = Number(options.sepia) + '%'

    sliderAfter(blurRange)
    sliderAfter(brightnessRange)
    sliderAfter(contrastRange)
    sliderAfter(grayscaleRange)
    sliderAfter(hueRotateRange)
    sliderAfter(invertRange)
    sliderAfter(opacityRange)
    sliderAfter(saturateRange)
    sliderAfter(sepiaRange)
}
/*FuckPappu */
onOff.addEventListener('click', () => {
    options.extensionOn = !options.extensionOn
    onOff.textContent = `Extension: ${options.extensionOn ? 'On' : 'Off'}`
    onOff.classList.toggle('active', options.extensionOn)
    saveOptions()
})

externalBtn.addEventListener('click', () => {
    options.externalBtn = !options.externalBtn
    externalBtn.textContent = `External Button: ${options.externalBtn ? 'On' : 'Off'}`
    externalBtn.classList.toggle('active', options.externalBtn)
    saveOptions()
})

blurRange.addEventListener('change', (e) => {
    options.blur = e.target.value
    saveOptions()
})

blurRange.addEventListener('input', (e) => {
    sliderAfter(e.target)
    blurRangeOutput.textContent = Number(e.target.value) + 'px'
})

brightnessRange.addEventListener('change', (e) => {
    options.brightness = e.target.value
    saveOptions()
})

brightnessRange.addEventListener('input', (e) => {
    sliderAfter(e.target)
    brightnessRangeOutput.textContent = Number(e.target.value) + '%'
})

contrastRange.addEventListener('change', (e) => {
    options.contrast = e.target.value
    saveOptions()
})

contrastRange.addEventListener('input', (e) => {
    sliderAfter(e.target)
    contrastRangeOutput.textContent = Number(e.target.value) + '%'
})

grayscaleRange.addEventListener('change', (e) => {
    options.grayScale = e.target.value
    saveOptions()
})

grayscaleRange.addEventListener('input', (e) => {
    sliderAfter(e.target)
    grayscaleRangeOutput.textContent = Number(e.target.value) + '%'
})

hueRotateRange.addEventListener('change', (e) => {
    options.hueRotate = e.target.value
    saveOptions()
})
/*FuckPappu */
hueRotateRange.addEventListener('input', (e) => {
    sliderAfter(e.target)
    hueRotateRangeOutput.innerHTML = Number(e.target.value) + '&deg;'
})

invertRange.addEventListener('change', (e) => {
    options.invert = e.target.value
    saveOptions()
})

invertRange.addEventListener('input', (e) => {
    sliderAfter(e.target)
    invertRangeOutput.textContent = Number(e.target.value) + '%'
})

opacityRange.addEventListener('change', (e) => {
    options.opacity = e.target.value
    saveOptions()
})

opacityRange.addEventListener('input', (e) => {
    sliderAfter(e.target)
    opacityRangeOutput.textContent = Number(e.target.value)
})

saturateRange.addEventListener('change', (e) => {
    options.saturation = e.target.value
    saveOptions()
})

saturateRange.addEventListener('input', (e) => {
    sliderAfter(e.target)
    saturateRangeOutput.textContent = Number(e.target.value) + '%'
})

sepiaRange.addEventListener('change', (e) => {
    options.sepia = e.target.value
    saveOptions()
})

sepiaRange.addEventListener('input', (e) => {
    sliderAfter(e.target)
    sepiaRangeOutput.textContent = Number(e.target.value) + '%'
})

rangeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const slider = e.target.parentElement.querySelector('.rangeSlider')
        if (!slider) {
            console.error('Slider not found for button:', e.target)
            return
        }
        slider.step = '0.01'
        const isPlus = e.target.classList.contains('plus')
        const currentValue = Number(slider.value)
        if (isNaN(currentValue)) {
            console.error('Invalid slider value:', slider.value)
            return
        }
        let newValue = currentValue + (isPlus ? 1 : -1)
        newValue = Math.max(Number(slider.min), Math.min(Number(slider.max), newValue))
        slider.value = newValue
        console.log(`Button clicked: ${isPlus ? '+' : '-'}, Slider: ${slider.id}, New value: ${newValue}`)
        slider.dispatchEvent(new Event('input'))
        slider.dispatchEvent(new Event('change'))
    })
})

function sliderAfter(slider) {
    let percent = 100 * (slider.value - slider.min) / (slider.max - slider.min)
    slider.style.background = `linear-gradient(90deg, #ff00ff, #00ffcc ${percent}%, #4D4D4D ${percent}%)`
}

function saveOptions() {
    chrome.storage.sync.set({
        'filterOptionsN': options
    })
}

reset.addEventListener('click', () => {
    options = {
        "extensionOn": true,
        "blur": 0,
        "brightness": 100,
        "contrast": 110,
        "grayScale": 0,
        "hueRotate": 0,
        "invert": 0,
        "opacity": 1,
        "saturation": 118,
        "sepia": 0,
        "externalBtn": false
    }
    setValues()
    saveOptions()
})
