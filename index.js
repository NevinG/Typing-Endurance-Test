const typingArea = document.getElementById("typing-area");
const blinkingCursor = document.getElementById("blinking-cursor");
const topLine = document.getElementById("top-line");
const bottomLine = document.getElementById("bottom-line");

let blinkInterval = undefined;
let timeElapsed = 0;
let charsTyped = 0;
let wpmInterval = undefined;
const charWidth = getCharWidth();
const wpmText = document.getElementById("wpm-text");

//add typing text
let currentTextLine = generateLine();
let nextTextLine = generateLine();
let currentTextLetter = 0;
addTextToDOM();

//start the blinking cursor
resetBlinker();

//listen for keyboard pressses
document.addEventListener("keypress", (e) => {
    if(e.key == currentTextLine[currentTextLetter]){
        //start wpm counter if it hasn't been started
        if(wpmInterval == undefined)
            wpmInterval = setInterval(updateWPM, 100);

        charsTyped++;
        currentTextLetter++;
        //update graphics
        blinkingCursor.parentNode.insertBefore(blinkingCursor, blinkingCursor.nextElementSibling.nextElementSibling);
        //reset blinker
        resetBlinker();

        //check if line is complete
        if(currentTextLetter == currentTextLine.length){
            currentTextLetter = 0;
            currentTextLine = nextTextLine;
            nextTextLine = generateLine();
            addTextToDOM();
        }
    }
});

//add a blinking cursor
function resetBlinker(){
    clearInterval(blinkInterval);
    blinkingCursor.style.backgroundColor = "black";
    blinkInterval = setInterval(startBlinking, 530);
}

function startBlinking(){
    if(blinkingCursor.style.backgroundColor == "black")
        blinkingCursor.style.backgroundColor = "transparent";
    else
        blinkingCursor.style.backgroundColor="black";
}

function getCharWidth(){
    let char = document.createElement("span");
    document.body.appendChild(char);
    char.innerHTML = "a";
    const width = char.getBoundingClientRect().width;
    char.remove();
    return width;
}

function addTextToDOM(){
    //remove children from TopLine except for "blinking-cursor"
    for(let i = 0; i < topLine.children.length; i++){
        if(topLine.children[i].id != "blinking-cursor"){
            topLine.children[i].remove();
            i--;
        }
    }

    //add text to top line
    for(let i = 0; i < currentTextLine.length; i++){
        const letter = document.createElement("span");
        letter.innerHTML = currentTextLine[i];
        topLine.appendChild(letter);
    }

    //remove children from bottom line
    bottomLine.innerHTML = '';

    //add text to bottom line
    for(let i = 0; i < nextTextLine.length; i++){
        const letter = document.createElement("span");
        letter.innerHTML = nextTextLine[i];
        bottomLine.appendChild(letter);
    }
}

//generates a line of text with the correct amount chars and words
function generateLine(){
    //generate the random line
    let line = "";
    while(true){
        //get random word
        const word = words[Math.floor(Math.random() * words.length)].toLowerCase();
        if(line.length + word.length > typingArea.offsetWidth / charWidth)
            break;
        line += word + " ";
    }

    //removes the space at the end of the line
    line = line.substring(0,line.length - 1);

    return line;
}

function updateWPM(){
    timeElapsed += .1;
    const newText = "Words per minute: " + (charsTyped / timeElapsed * 12).toFixed(0);
    if(newText != wpmText.innerHTML)
        wpmText.innerHTML = "Words per minute: " + (charsTyped / timeElapsed * 12).toFixed(0);
}