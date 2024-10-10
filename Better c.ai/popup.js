document.addEventListener('DOMContentLoaded', function () {

    //Get and apply saved visual settings
    chrome.storage.sync.get('formattingColors', function (data) {
        document.getElementById('formattingColorsToggle').checked = !!data.formattingColors;
    });
    chrome.storage.sync.get('stuckText', function (data) {
        document.getElementById('disableStruckTextToggle').checked = !!data.stuckText;
    });
    chrome.storage.sync.get('boldColor', function (data) {
        document.getElementById('boldTextColor').value = data.boldColor
    });
    chrome.storage.sync.get('italicsColor', function (data) {
        document.getElementById('italicsTextColor').value = data.italicsColor
    });

    chrome.storage.sync.get('textSize', function (data) {
        document.getElementById('textSizeDisplay').innerHTML = data.textSize
        document.getElementById('textSizePicker').value = data.textSize
    });

    //Send toggled settings to content script
    document.getElementById('formattingColorsToggle').addEventListener('change', function () {

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

    document.getElementById('disableStruckTextToggle').addEventListener('change', function () {

        chrome.storage.sync.set({ 'stuckText': this.checked })


        if (this.checked) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'struckTextOn' });
            });
        } else {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'struckTextOff'});
            });
        }
    })

    document.getElementById('boldTextColor').addEventListener('blur', function () {
         x = this.value

        chrome.storage.sync.set({ 'boldColor': this.value })

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'changeBoldTextColor', value: x });
        });
    })

    document.getElementById('italicsTextColor').addEventListener('blur', function () {
        x = this.value

        chrome.storage.sync.set({ 'italicsColor': this.value })

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'changeItalicsTextColor', value: x });
        });
    })


    document.getElementById('textSizePicker').addEventListener('input', function () {
        document.getElementById('textSizeDisplay').innerHTML = this.value
        x = this.value

        chrome.storage.sync.set({ 'textSize': this.value })

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'changeTextSize', value: x});
        });
    })
})