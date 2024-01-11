const typingArea = document.getElementById("typing-area");

//add typing text
let testText = "hello how are you doing today";
for(let i = 0; i < testText.length; i++){
    const letter = document.createElement("span");
    letter.innerHTML = testText[i];
    typingArea.appendChild(letter);
}

//add a blinking cursor