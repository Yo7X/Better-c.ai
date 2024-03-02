console.log('Better c.ai loaded!');
let userTextSize = 16

// Function to append the button
function appendButton(targetDiv) {
    const button = document.createElement('button');
    button.id = 'better-cai-saveBot'
    targetDiv.appendChild(button);

    const div = document.createElement('div');
    div.innerHTML = `&nbsp;<p>     B+</p> Save bot`
    div.classList.add("flex")
    div.classList.add("items-center")
    div.classList.add("w-fit") 
    div.classList.add("gap-3")

    //Stupid fucking arrow thing
    const outerDiv = document.createElement("div");
    outerDiv.classList.add("flex", "gap-1", "items-center");
    const paragraph = document.createElement("p");
    paragraph.textContent = "";
    paragraph.classList.add("line-clamp-1", "text-ellipsis", "break-anywhere", "overflow-hidden", "whitespace-normal", "text-muted-foreground");
    const innerDiv = document.createElement("div");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.classList.add("text-muted-foreground", "size-3");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M9 4l8 8-8 8");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("stroke-width", "2");
    svg.appendChild(path);
    innerDiv.appendChild(svg);
    outerDiv.appendChild(paragraph);
    outerDiv.appendChild(innerDiv);
    div.appendChild(outerDiv);

    document.getElementById('better-cai-saveBot').appendChild(div)
}


function appendSection(targetSection) {
    const list = document.createElement('li');
    list.classList.add('mb-6')

    targetSection.insertBefore(list, targetSection.children[1]);

    //Ttile
    const container = document.createElement('div');
    container.classList.add('w-full')
    container.classList.add('h-full')
    list.appendChild(container)

    const title = document.createElement('div');
    container.classList.add('mb-4')
    container.classList.add('ml-4')
    container.appendChild(title)

    const titleText = document.createElement('p');
    titleText.innerText = 'Saved bots'
    title.appendChild(titleText)

    //content
    const contentContainer = document.createElement('div');
    container.classList.add('relative')
    container.classList.add('group')
    list.appendChild(contentContainer)

    const contentContainer2 = document.createElement('div');
    container.classList.add('swiper')
    container.classList.add('swiper-initialized')
    container.classList.add('swiper-horizontal')
    container.classList.add('swiper-free-mode')
    container.classList.add('swiper-watch-progress')
    container.classList.add('shelfSwiper')
    contentContainer.appendChild(contentContainer2)

    const contentContainer3 = document.createElement('div');
    container.classList.add('swiper-wrapper')
    contentContainer2.appendChild(contentContainer3)

    const contentCharacter = document.createElement('div');
    contentCharacter.style.background = '';
    contentCharacter.innerText = '';
    contentContainer3.appendChild(contentCharacter)

    chrome.storage.sync.get('bPlusSavedBots', function (data) {
        console.log('555')
        if (data.bPlusSavedBots) {
            
            x = data.bPlusSavedBots.length
            console.log(x)
            for (let i = 0; i < x +1; i++) {
                console.log('s')
                const f = document.createElement('div')
                f.style.cursor = "pointer"
                f.innerHTML = data.bPlusSavedBots[i][0] + "<br>" + data.bPlusSavedBots[i][2] + '<br>' + data.bPlusSavedBots[i][1] + '<br><hr><br>'
                f.addEventListener('click', function() {
                    console.log(data.bPlusSavedBots[i][4])
                    window.location.href = data.bPlusSavedBots[i][4];
                })
                contentContainer3.appendChild(f)
            }
        } else {
            const h = document.createElement('div')
            h.innerHTML = 'No saved bots <br>Click the save button while chatting with a character to have them show up here here'
            contentContainer3.appendChild(h)
        }
    });


}

function addSavedBots() {
    // Create an observer instance
    const observer = new MutationObserver((mutations) => {
        const targetDiv = document.querySelector('div.w-\\[325px\\].h-full.border-l.border-l-muted.flex-col.p-4.gap-3.hidden.lg\\:flex');
        const targetSection = document.querySelector('div.pl-2.md\\:pl-0');  //ol.flex.flex-col.pt-6



        if (targetDiv) {
            appendButton(targetDiv);
            document.getElementById('better-cai-saveBot').addEventListener('click', function () {
                const botName = document.querySelector('p.font-semi-bold');
                const botDescription = document.querySelector('p.text-muted-foreground.text-sm:not([title]):not(.font-extralight)');
                const botAuthor = document.querySelector('a.hover\\:text-foreground');
                const botpfp = document.querySelector('img.object-cover.object-center.bg-card.shrink-0.grow-0.h-full')

                console.log("Name - " + botName.innerText)
                console.log("Description - " + botDescription .innerText)
                console.log("Author - " + botAuthor.innerText)
                console.log("Profile picture - " + botpfp.src)
                console.log("URL - " + window.location.href)

                chrome.storage.sync.get('bPlusSavedBots', function (data) {
                    if (data.bPlusSavedBots) {
                        savedBotList = data.bPlusSavedBots
                        console.log(savedBotList)
                        x = savedBotList.length
                        console.log(savedBotList.length, x)
                        savedBotList[x] = [botName.innerText, botDescription.innerText, botAuthor.innerText, botpfp.src, window.location.href]
                        chrome.storage.sync.set({ 'bPlusSavedBots': savedBotList })
                        alert('Character saved')
                    } else {
                        savedBotList = [
                            [botName.innerText, botDescription.innerText, botAuthor.innerText, botpfp.src, window.location.href]
                        ]
                        chrome.storage.sync.set({ 'bPlusSavedBots': savedBotList })
                        console.log('dafgsdgfasdhfadhhaahafsdhfashsafdhsfadhshfadh')
                        alert('Character saved \nI recomend not saving the same character twice because as of right now the only way to remove them is by clearing the entire saved list')
                    }
                });
            })
            console.log('found asside')
            observer.disconnect();
        }

        if (targetSection) {
            appendSection(targetSection);
            console.log('found section')
            observer.disconnect();
        }
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}


chrome.storage.sync.get('formattingColors', function (data) {
    if (data.formattingColors) {
        enableFormattingColors()
    }
});



chrome.storage.sync.get('userSelectedTextSize', function (data) {
    if (data.userSelectedTextSize) {
        userTextSize = parseInt(data.userSelectedTextSize)

        chrome.storage.sync.get('customTextSize', function (data) {
            if (data.customTextSize) {
                enableCustomTextSize()
            }
        });

    }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message.action == 'formattingColorsOn') {

        // chrome.storage.sync.get('bPlusSavedBots', function (data) {
        //     if (data.bPlusSavedBots) {
        //         console.log(data.bPlusSavedBots)
        //     }
        // });


        enableFormattingColors()
    }

    if (message.action == 'formattingColorsOff') {
        disableFormattingColors()
    }


    if (message.action == 'customTextSizeOn') {

        // chrome.storage.sync.remove('bPlusSavedBots');

        userTextSize = message.value
        enableCustomTextSize()
    }

    if (message.action == 'customTextSizeOff') {
        disableCustomTextSize()
    }

    if (message.action == 'pageChange') {
        console.log('Page changed')
        addSavedBots()
    }

    if (message.action == 'resetBots') {
        resetSavedBots()
    }
});


//Formatting colors
function enableFormattingColors() {
    const style = document.createElement('style');
    style.id = 'formatting-colors';
    style.textContent =
        `
            .mt-1 em {
                color: #ff9cd1;
            }

            .mt-1 strong {
                color: #ff1212;
            }

            .mt-1 p {
                color: white;
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



//Custom text size
function enableCustomTextSize() {
    const style = document.createElement('style');
    style.id = 'text-size';
    style.textContent =
        `
        .mt-1 p {
            font-size: ${userTextSize}px !important;
        }
        `;
    document.head.appendChild(style);
}

function disableCustomTextSize() {
    const style = document.getElementById('text-size');
    if (style) {
        style.remove();
    }
}

function resetSavedBots() {
    chrome.storage.sync.remove('bPlusSavedBots');
}