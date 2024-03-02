chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        chrome.tabs.executeScript(tabId, { file: 'content.js' });
    }
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'pageChange'});
    });

});