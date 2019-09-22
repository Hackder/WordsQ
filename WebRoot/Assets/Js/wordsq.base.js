
let lections = [];
let selectedWordsTxt = null;
let txtFrom, txtTo = null;
let typeSelection = null;
let prefixes = null;
let txtProgress = null;
let txtQuestion = null;
let txtInput, txtInputContainer, txtWrongWord = null;
let wordChoices = [], wordChoiceObjects = [], wordChoiceTxts = [];
let wordChoiceContainer = null;
let submitButton = null;

function randItem(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

function OnLoad() {
    // Load lections
    for (let i = 0; i < 6; i++) {
        let chBox = document.getElementById("lection" + (i+1));
        lections.push(chBox);
    }

    // Add span that displays the total amount of words
    selectedWordsTxt = document.getElementById("selected-words-total");

    // Add range number boxes
    txtFrom = document.getElementById("txtFrom");
    txtTo = document.getElementById("txtTo");

    let sum = 0;
    allLections.forEach((e,i) => {
        sum += e.length;
    });

    txtFrom.max = sum;
    txtTo.max = sum;

    typeSelection = document.getElementById("typeSelection");

    prefixes = {
        Der: document.getElementById("prefixDer"),
        Die: document.getElementById("prefixDie"),
        Das: document.getElementById("prefixDas"),
        None: document.getElementById("prefixNone")
    };

    txtProgress = document.getElementById("txtProgress");

    txtQuestion = document.getElementById("txtQuestion");

    txtInput = document.getElementById("inputText");
    txtInputContainer = document.getElementById("inputTextContainer");
    txtWrongWord = document.getElementById("wrong-word-txt")

    for (let i = 0; i < 3; i++) {
        let element = document.getElementById("word" + (i+1));
        let content = element.children[0];
        wordChoices.push(content);
        wordChoiceObjects.push(element);
        wordChoiceTxts.push(element.children[1]);
    }

    wordChoiceContainer = document.getElementById("wordChoiceContainer");

    submitButton = document.getElementById("submitButton");
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}