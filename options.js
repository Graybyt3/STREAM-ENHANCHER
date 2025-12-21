/*FuckPappu */
async function loadOptionsOrSetDefaults() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('filterOptionsN', async (item) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError)
            }
            let filterOptionsN = item?.filterOptionsN
            if (!filterOptionsN) {
                filterOptionsN = {
                    "extensionOn": true,
                    "blur": 0,
                    "brightness": 100,
                    "contrast": 110,
                    "grayScale": 0,
                    "hueRotate": 0,
                    "invert": 0,
                    "opacity": 1,
                    "saturation": 120,
                    "sepia": 0,
                    "externalBtn": false,
                    "lastVolume": 0.5
                }
                chrome.storage.sync.set({
                    'filterOptionsN': filterOptionsN
                })
            }
            resolve(filterOptionsN)
        })
    })
}
/*FuckPappu */
