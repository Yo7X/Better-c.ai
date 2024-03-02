document.addEventListener('DOMContentLoaded', function () {

    //Get and apply saved visual settings
    chrome.storage.sync.get('formattingColors', function (data) {
        document.getElementById('formattingColors').checked = !!data.formattingColors;
    });

    chrome.storage.sync.get('customTextSize', function (data) {
        document.getElementById('customTextSize').checked = !!data.customTextSize;
    });



    //Send toggled settings to content script
    document.getElementById('formattingColors').addEventListener('change', function () {

        chrome.storage.sync.set({ 'formattingColors': this.checked })


        if (this.checked) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'formattingColorsOn' });
            });
        } else {
            x = 5
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'formattingColorsOff', value: x});
            });
        }
    })

    document.getElementById('customTextSize').addEventListener('change', function () {

        chrome.storage.sync.set({ 'customTextSize': this.checked })

        if (this.checked) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'customTextSizeOn', value: document.getElementById('textSizePicker').value });
            });
        } else {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'customTextSizeOff'});
            });
        }
    })

    chrome.storage.sync.get('userSelectedTextSize', function (data) {
        if (data.userSelectedTextSize) {
            document.getElementById('textSizePicker').value = parseInt(data.userSelectedTextSize);
            document.getElementById('textSizeDisplay').innerHTML = data.userSelectedTextSize
        }
    });

    document.getElementById('textSizePicker').addEventListener('input', function() {
        chrome.storage.sync.set({ 'userSelectedTextSize': this.value })
        document.getElementById('textSizeDisplay').innerHTML = this.value
    })

})


document.getElementById('rstSvdBts').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'resetBots' });
    });
})