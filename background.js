chrome.runtime.onInstalled.addListener(reason => {
    if (reason.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        let thankYouPage = "https://graybyte.host"
        chrome.tabs.create({ url: thankYouPage })
    }
    reloadTabs()
})

function reloadTabs() {
    chrome.tabs.query({ url: "*://*.youtube.com/*" }, function(tabs) {
        if (tabs.length > 0) {
            tabs.forEach(tab => {
                chrome.tabs.reload(tab.id)
            })
        }
    })
}
/*FuckPappu */
