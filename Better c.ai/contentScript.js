console.log('Better c.ai loaded!');

let textSize = 16
chrome.storage.sync.get('textSize', function (data) {
    if (data.textSize) {
        textSize = data.textSize
    }
});


let struckText = 'line-through'
chrome.storage.sync.get('stuckText', function (data) {
    if (data.stuckText) {
        struckText = 'none'
    }
});

let boldColor = 'red';
chrome.storage.sync.get('boldColor', function (data) {
    if (data.boldColor) {
        boldColor = data.boldColor
    }
});

let italicsColor = 'pink';
chrome.storage.sync.get('italicsColor', function (data) {
    if (data.italicsColor) {
        italicsColor = data.italicsColor
    }
});

chrome.storage.sync.get('formattingColors', function (data) {
    if (data.formattingColors) {
        enableFormattingColors()
    }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message.action)
    switch (message.action) {
        case 'formattingColorsOn':
            enableFormattingColors()
        break;
        case 'formattingColorsOff':
            disableFormattingColors()
        break;
        case 'changeBoldTextColor':
            changeBoldTextColor(message.value)
        break;
        case 'changeItalicsTextColor':
            changeItalicsTextColor(message.value)
        break;
        case 'struckTextOn':
            struckText = 'none'
            changeBoldTextColor(boldColor)
        break;
        case 'struckTextOff':
            struckText = 'line-through'
            changeBoldTextColor(boldColor)
        break;
        case 'changeTextSize':
            textSize = parseInt(message.value)
            console.log(textSize)
            changeBoldTextColor(boldColor)
        break;
        default:
            console.log('Error')
        break;
    }
});


//Formatting colors
function enableFormattingColors() {
    const style = document.createElement('style');
    style.id = 'formatting-colors';
    style.textContent =
        `
            .mt-1 em {
                color: ${italicsColor};
            }

            .mt-1 strong {
                color: ${boldColor};
            }

            .mt-1 p {
                color: white;
                font-size: ${textSize}px;
            }

            del {
                text-decoration: ${struckText};
            }
        `;
    document.head.appendChild(style);
}

function disableFormattingColors() {
    const style = document.getElementById('formatting-colors');
    if (style) {
        style.remove();
    }
}

//Text color changes
function changeBoldTextColor(color) {
    boldColor = color
    const Oldstyle = document.getElementById('formatting-colors');
    if (Oldstyle) {
        Oldstyle.remove();
    }

    const style = document.createElement('style');
    style.id = 'formatting-colors';
    style.textContent =
        `
            .mt-1 em {
                color: ${italicsColor};
            }

            .mt-1 strong {
                color: ${boldColor};
            }

            .mt-1 p {
                color: white;
                font-size: ${textSize}px;
            }

            del {
                text-decoration: ${struckText};
            }
        `;
    document.head.appendChild(style);
}

function changeItalicsTextColor(color) {
    italicsColor = color
    const Oldstyle = document.getElementById('formatting-colors');
    if (Oldstyle) {
        Oldstyle.remove();
    }

    const style = document.createElement('style');
    style.id = 'formatting-colors';
    style.textContent =
        `
            .mt-1 em {
                color: ${italicsColor};
            }

            .mt-1 strong {
                color: ${boldColor};
            }

            .mt-1 p {
                color: white;
                font-size: ${textSize}px;
            }

            del {
                text-decoration: ${struckText};
            }
        `;
    document.head.appendChild(style);
}