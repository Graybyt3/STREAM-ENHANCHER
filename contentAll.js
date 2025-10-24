const extIcon = chrome.runtime.getURL('assets/videofilterYoutube.png')
const btnText = chrome.i18n.getMessage('btnText')
let filterOptionsForAll

async function initContent() {
    filterOptionsForAll = await loadOptionsOrSetDefaults()
    if (filterOptionsForAll.externalBtn) {
        createButton()
    }
}

initContent()
/*FuckPappu */
chrome.storage.onChanged.addListener(
    (changes, areaName) => {
        if (areaName === 'sync' && changes.filterOptionsN?.newValue) {
            filterOptionsForAll = changes.filterOptionsN.newValue
            if (filterOptionsForAll.externalBtn) {
                createButton()
            } else {
                eraseBtn()
            }
        }
    }
)


function eraseBtn() {
    const linkBtn = document.querySelector('div.filterNLinkExt')
    if (linkBtn) {
        linkBtn.remove()
    }
}

function createButton() {
    if (location.host.includes('netflix')) {
        return
    }
    eraseBtn()
    const linkBtn = document.createElement('div')
    const createModal = () => {
        linkBtn.className = 'filterNLinkExt'
        linkBtn.innerHTML = `
            <a href="https://youtube.com/" target="_blank">
                <img src=${extIcon} alt="icon">
                <div class="innerShortsLinkExt">${btnText}</div>
            </a>
        `
        document.querySelector('body').append(linkBtn)
    }
    createModal()
}
/*FuckPappu */
