const topicText = document.querySelector(".topic p")
const typingText = document.querySelector(".typing-text p");
let inpField = document.querySelector(".wrapper .input-field");
let correctTag = document.querySelector(".correct-types span");
let mistakeTag = document.querySelector(".miss-types span");
let accuracyTag = document.querySelector(".accuracy span");
let tryAgainBtn = document.querySelector("button");

let charIndex = correctTypes = mistakes = 0;

function randomParagraph() {
    // getting random number and it'll always less than the idioms length
    let randIndex = Math.floor(Math.random() * idioms.length);

    // insert topic above the typing text
    topicText.innerHTML = idioms_ja[randIndex];

    typingText.innerHTML = "";

    // getting random item from the idioms array, splitting all characters of it,
    // adding each character inside span and the adding this span inside p tag.
    idioms[randIndex].split("").forEach((char) => {
        let spanTag = `<span>${char}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    
    // focusing input field on keydown or click event
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    // if user hasn't entered any character or pressed backspace
    if(typedChar == null)
    {
        charIndex--; // decrement charIndex
        // decrement mistakes and correctTypes only if the charIndex span contains incorrect class and correct class
        if(characters[charIndex].classList.contains("incorrect"))
        {
            mistakes--;
        }
        else
        {
            correctTypes--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");
    }
    else
    {
        if(characters[charIndex].innerHTML === typedChar)
        {
            // if user typed character and shown character matched, increment the correctTypes and add the correct class 
            correctTypes++
            characters[charIndex].classList.add("correct");
        }
        else 
        {
            // if user typed character and shown character unmatched, increment the mistakes and add the incorrect class
            mistakes++;
            characters[charIndex].classList.add("incorrect");
        }
        charIndex++; // increment charIndex either user typed correct or incorrect character
    }
    characters.forEach((char) => char.classList.remove("active"));
    characters[charIndex].classList.add("active");

    const accuracy = (correctTypes / (correctTypes + mistakes) * 100).toFixed(1)

    correctTag.innerHTML = correctTypes;
    mistakeTag.innerHTML = mistakes;
    accuracyTag.innerHTML = accuracy;
}

function resetTyping() {
    // calling randomParagraph function and reseting each variables and elements value to default
    randomParagraph();
    inpField.value = "";
    charIndex = correctTypes = mistakes = 0;
    correctTag.innerHTML = 0;
    mistakeTag.innerHTML = 0;
    accuracyTag.innerHTML = "";
}

randomParagraph();

inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetTyping);