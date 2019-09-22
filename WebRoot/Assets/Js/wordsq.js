let totalWordCount = 0;
let type = 0;
let from = -1;
let to = -1;

// Fired when all of the elements of the page are loaded
function Loaded() {
    // Add event listeners
    lections.forEach((e,i) => {
        e.addEventListener("change", lectionChecked);
    });

    // Clamp range values
    txtFrom.addEventListener("change", () => {
        txtFrom.value = parseInt(txtFrom.value).clamp(
            totalWordCount > 0 ? 1 : 0, totalWordCount);
        from = parseInt(txtFrom.value);
        refreshQuiz();
    });
    txtTo.addEventListener("change", () => {
        txtTo.value = parseInt(txtTo.value).clamp(
            txtFrom.value != "" ? parseInt(txtFrom.value) : 0, totalWordCount);
        to = parseInt(txtTo.value);
        refreshQuiz();
    });

    // Change quiz based on selected type
    typeSelection.addEventListener("change", () => {
        if (typeSelection.selectedIndex > 0) {
            if (to - from + 1 < 3) {
                alert("Not enough words selected for this mode!")
                typeSelection.selectedIndex = 0;
                type = 0;
                return;
            }
            txtInputContainer.classList.add("hidden");
            wordChoiceContainer.classList.remove("hidden");
        } else {
            txtInputContainer.classList.remove("hidden");
            wordChoiceContainer.classList.add("hidden");
        }
        type = typeSelection.selectedIndex;
        if (type > 0) {
            reShowWord();
        }
    });

    submitButton.addEventListener("click", submitBtnClicked);
}

// Checked / Unchecked some lection
function lectionChecked(event) {
    if (event.target.checked) {
        totalWordCount += allLections[
            parseInt(event.target.id.replace("lection", "")) -1
        ].length;
    } else {
        totalWordCount -= allLections[
            parseInt(event.target.id.replace("lection", "")) -1
        ].length;
    }
    selectedWordsTxt.textContent = totalWordCount;
    txtTo.max = totalWordCount;
    txtFrom.max = totalWordCount;
    refreshQuiz();
}


let words = []
let progress = 1;
let isNext = false;

let question, prefix, answer;

// Resets the quiz if some setting changes
function refreshQuiz() {
    if (totalWordCount < 1 || from < 0 || to < 0) {
        submitButton.disabled = true;
         return;
    }

    let allWords = [];
    lections.forEach((e,i) => {
        if (e.checked == true) {
            allWords = allWords.concat(allLections[i]);
        }
    });
    progress = 1;
    submitButton.disabled = false;
    words = allWords.slice(from-1, to);
    words = shuffle(words);
    txtProgress.textContent = progress + "/" + words.length;
    

    nextWord(words[0]);
}

// Disables all of the inputs
function disableAll() {
    txtInput.disabled = true;
    wordChoices.forEach((e,i) => {
        e.disabled = true;
    });
    for (let prop in prefixes) {
        if (Object.prototype.hasOwnProperty.call(prefixes, prop)) {
            prefixes[prop].disabled = true;
        }
    }
}

function submitBtnClicked() {
    // if next jump to the next word
    if (isNext) {
        progress += 1;
        isNext = false;
        submitButton.value = "Check";
        if (progress > words.length) {
            disableAll();
            submitButton.disabled = true;
            return;
        }
        txtProgress.textContent = progress + "/" + words.length;
        nextWord(words[progress - 1]);
        return;
    }

    isNext = true;
    submitButton.value = "Next";

    disableAll();

    // Check the prefix
    prefixes[prefix].classList.add("correct-prefix-choice");
    if (prefixes[prefix].checked == false) {
        for (let prop in prefixes) {
            if (Object.prototype.hasOwnProperty.call(prefixes, prop)) {
                if (prefixes[prop].checked) {
                    prefixes[prop].classList.add("wrong-prefix-choice");
                }
            }
        }
    }

    // Check for type 0 (filling the word manually)
    if (type == 0) {
        if (txtInput.value == answer) {
            txtInput.classList.add("correct-input");
        } else {
            txtInput.classList.add("wrong-input");
            txtWrongWord.classList.add("shown");
            txtWrongWord.textContent = answer;
        }
    }
    else if (type == 1) {
        wordChoices.forEach((e,i) => {
            if (wordChoiceTxts[i].textContent == answer) {
                wordChoiceObjects[i].classList.add("correct-choice");
            } else if (e.checked) {
                wordChoiceObjects[i].classList.add("wrong-choice");
            }
        });
    }
}

function nextWord(raw_word) {
    // Reset inputs
    txtInput.disabled = false;
    txtWrongWord.classList.remove("shown");
    txtInput.classList.remove("correct-input");
    txtInput.classList.remove("wrong-input");
    txtInput.value = "";
    wordChoices.forEach((e,i) => {
        e.disabled = false;
        e.checked = false;
        wordChoiceObjects[i].classList.remove("correct-choice");
        wordChoiceObjects[i].classList.remove("wrong-choice");
    });
    for (let prop in prefixes) {
        if (Object.prototype.hasOwnProperty.call(prefixes, prop)) {
            prefixes[prop].disabled = false;
            prefixes[prop].checked = false;
            prefixes[prop].classList.remove("wrong-prefix-choice");
            prefixes[prop].classList.remove("correct-prefix-choice");
        }
    }

    let parts = raw_word.split("$");
    question = parts[0];
    prefix = parts[1];
    answer = parts[2];

    txtQuestion.textContent = question;
    
    if (type > 0) {
        reShowWord();
    }
}

function reShowWord() {
    if (type == 0) return;

    let words_save = [];
    words_save = words_save.concat(words);

    let option2, option3;

    if (type == 1) {
        words_save.splice(words_save.indexOf(question+"$"+prefix+"$"+answer), 1);
        option2 = randItem(words_save);
        words_save.splice(words_save.indexOf(option2), 1);
        option3 = randItem(words_save);
        words_save.splice(words_save.indexOf(option3), 1);

        option2 = option2.split("$")[2];
        option3 = option3.split("$")[2];
    }

    let options = shuffle([answer, option2, option3]);
    for (let i = 0; i < 3; i++) {
        wordChoiceTxts[i].textContent = options[i];
    }
}