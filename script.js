
// 10 frågor och svarsalternativ i en array

let questionArray = [
{
    number: "Fråga 1",
    question: "Fråga 1",
    alternatives: [
        {alternative: "true", isCorrect: true},
        {alternative: "false", isCorrect: false}
    ]
},
{
    number: "Fråga 2",
    question: "Fråga 2",
    alternatives: [
        {alternative: "false", isCorrect: false},
        {alternative: "true", isCorrect : true},
        {alternative: "don't know", isCorrect: false},
        {alternative: "true", isCorrect: true}
    ]
},
{
    number: "Fråga 3",
    question: "Fråga 3",
    alternatives: [
        {alternative: "false", isCorrect: false},
        {alternative: "don't know", isCorrect: false},
        {alternative: "no comment", isCorrect : false},
        {alternative: "true", isCorrect: true}
    ]
},
{
    number: "Fråga 4",
    question: "Fråga 4",
    alternatives: [
        {alternative: "true", isCorrect: true},
        {alternative: "false", isCorrect: false}
    ]
},
{
    number: "Fråga 5",
    question: "Fråga 5",
    alternatives: [
        {alternative: "true", isCorrect: true},
        {alternative: "false", isCorrect: false}
    ]
},
{
    number: "Fråga 6",
    question: "Fråga 6",
    alternatives: [
        {alternative: "true", isCorrect: true},
        {alternative: "false", isCorrect: false}
    ]
},
{
    number: "Fråga 7",
    question: "Fråga 7",
    alternatives: [
        {alternative: "true", isCorrect: true},
        {alternative: "false", isCorrect: false}
    ]
},
{
    number: "Fråga 8",
    question: "Fråga 8",
    alternatives: [
        {alternative: "true", isCorrect: true},
        {alternative: "false", isCorrect: false}
    ]
},
{
    number: "Fråga 9",
    question: "Fråga 9",
    alternatives: [
        {alternative: "true", isCorrect: true},
        {alternative: "false", isCorrect: false}
    ]
},
{
    number: "Fråga 10",
    question: "Fråga 10",
    alternatives: [
        {alternative: "true", isCorrect: true},
        {alternative: "false", isCorrect: false}
    ]
}
];


// Ändrar klass på bodyn för att manipulera färger på bakgrund och text KLAR

let changeColorBtn = document.querySelector("#changeColorBtn");
let changeColor = document.querySelector(".dark-mode");

changeColorBtn.addEventListener("click", () => {
    changeColor.classList.toggle("light-mode");
    changeColor.classList.toggle("dark-mode");

    let darkMode = document.querySelector("body.dark-mode");
    let lightMode = document.querySelector("body.light-mode");

    if (darkMode) {
        changeColorBtn.innerText = "Ändra tema till LIGHT";
    } else if (lightMode) {
        changeColorBtn.innerText = "Ändra tema till DARK";
    }
});


// Quiz querySelectors och declarations

let startBtn = document.querySelector("#startBtn");
let nextBtn = document.querySelector("#nextBtn");
let questionContent = document.querySelector("#question-content");
let questionNr = document.querySelector("#questionNr");
let questionText = document.querySelector("#questionText");
let btnGrid = document.querySelector(".btn-grid");
let answerDiv = document.querySelector("#answers");
let points = document.querySelector("#points");
let totalPoints = 0;
let ol = document.querySelector("#ol");
let questionIndex = 0;
let counterIndex = 0;
let answerArray = [];


// Funktion för att starta quiz KLAR

let startQuiz = () => {
    startBtn.classList.add("hide");
    questionContent.classList.remove("hide");
    nextBtn.classList.remove("hide");
    showNextQuestion();
};

startBtn.addEventListener("click", startQuiz);


// Funktion som skriver ut fråga och alternativ

let showNextQuestion = () => {
    questionNr.innerText = questionArray[questionIndex].number;
    questionText.innerText = questionArray[questionIndex].question;
    let alt = questionArray[questionIndex].alternatives;
    let trueAlternatives = 0;

    alt.forEach((trueAlternative) => {
        if (trueAlternative.isCorrect) {
            trueAlternatives++;
        }
    });
    
    alt.forEach((alternative, index) => {
        let div = document.createElement("div");
        div.classList.add("alt");
        let label = document.createElement("label");
        
        if (alt.length === 2 || (alt.length === 4 && trueAlternatives === 1 )) {
            let radio = document.createElement("input");
            radio.setAttribute("type", "radio");
            radio.setAttribute("name", "alternative");
            radio.setAttribute("id", "alt"+index);
            radio.setAttribute("value", alternative.isCorrect);
            
            label.innerText = alternative.alternative;
            label.setAttribute("for", "alt"+index);
            
            div.append(radio, label)
            btnGrid.append(div);        
        } else {
            let checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", "alt"+index);
            checkbox.setAttribute("value", alternative.isCorrect);

            label.innerText = alternative.alternative;
            label.setAttribute("for", "alt"+index);
            
            div.append(checkbox, label);
            btnGrid.append(div);
        }
    });
    questionIndex++;
};


// En längre funktion som rensar tidigare fråga, visar nästa fråga om minst ett svarsalternativ är angivet
// och registrerar om angivna svar är rätt eller fel när vi trycker på knappen "Nästa fråga"
let ifChecked = () => {
    let oneCheckedInput = document.querySelector("input:checked");
    let moreCheckedInput = document.querySelectorAll("input:checked");

// En funktion som kontrollerar om checkade svar är rätt eller fel och skapar upp en li-tagg för detta
    let test = () => {
        let altTwo = questionArray[counterIndex].alternatives;
        let trueCounter = 0;
    
        // en forEach som räknar hur många svar totalt som är rätt (true) i frågan vi ställer
        altTwo.forEach((counter) => {
            let countTrueAnswers = counter.isCorrect;
            
            if (countTrueAnswers) {
                trueCounter++;
            }
        });

        counterIndex++;

        // forEach som returnerar alla checkade svar till en array
        moreCheckedInput.forEach((value) => {
            answerArray.push(value.value);
        });

        // en funktion som ska filtrera vår array på värdet "true" för att vi ska kunna
        // jämnföra om checkade true är lika med alla true svarsalternativ
        let checkTrue = (check) => {
            return check === "true";
        };
        let resultCounter = answerArray.filter(checkTrue).length;

        // en if/else som registrerar en li-tagg med rätt/fel svar till en ordered list
            if (answerArray.includes("false")) {
                let result = document.createElement("li");
                result.innerText = "Fel svar";
                ol.append(result);
            } else if (answerArray.includes("true") && (resultCounter === trueCounter)) {
                totalPoints += 10;
                let result = document.createElement("li");
                result.innerText = "Rätt svar";
                ol.append(result);
            }

        answerArray = [];
    
    };

    test();

    if (!oneCheckedInput) {
        alert("Du behöver ange minst ett svarsalternativ");
    } else {
        questionNr.innerText = "";
        questionText.innerText = "";
        btnGrid.innerHTML = "";

        if (questionIndex < 10) {
            showNextQuestion();
        }

        if (questionIndex === 10) {
            nextBtn.innerText = "Visa resultat";
            points.innerText = totalPoints + "% rätt";

        // lägg till en if/else som färgar totalPoints HÄR!!!

            nextBtn.addEventListener("click", () => {
                answerDiv.classList.remove("hide");
                nextBtn.classList.add("hide");
            });
        }
    }
};

nextBtn.addEventListener("click", ifChecked);