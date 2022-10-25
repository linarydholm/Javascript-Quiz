
// 10 frågor och svarsalternativ i en array

let questionArray = [
{
    number: "Fråga 1",
    question: "Lina har 2 katter?",
    alternatives: [
        {alternative: "Sant", isCorrect: true},
        {alternative: "Falskt", isCorrect: false}
    ]
},
{
    number: "Fråga 2",
    question: "Vad har Lina för mellannamn?",
    alternatives: [
        {alternative: "Marie", isCorrect : true},
        {alternative: "Helena", isCorrect: false},
        {alternative: "Matilda", isCorrect: false},
        {alternative: "Louise", isCorrect: true}
    ]
},
{
    number: "Fråga 3",
    question: "Hur många syskon har Lina?",
    alternatives: [
        {alternative: "1", isCorrect: false},
        {alternative: "2", isCorrect: false},
        {alternative: "3", isCorrect : true},
        {alternative: "4", isCorrect: false}
    ]
},
{
    number: "Fråga 4",
    question: "Linas mamma heter Lena?",
    alternatives: [
        {alternative: "Sant", isCorrect: true},
        {alternative: "Falskt", isCorrect: false}
    ]
},
{
    number: "Fråga 5",
    question: "Lina bär sin mamma eller pappas efternamn?",
    alternatives: [
        {alternative: "Sant", isCorrect: false},
        {alternative: "Falskt", isCorrect: true}
    ]
},
{
    number: "Fråga 6",
    question: "Vilken av apparna spenderar Lina mest tid på?",
    alternatives: [
        {alternative: "Facebook", isCorrect: false},
        {alternative: "Instagram", isCorrect: false},
        {alternative: "TikTok", isCorrect : false},
        {alternative: "Youtube", isCorrect: true}
    ]
},
{
    number: "Fråga 7",
    question: "Linas favoritgodis är choklad?",
    alternatives: [
        {alternative: "Sant", isCorrect: true},
        {alternative: "Falskt", isCorrect: false}
    ]
},
{
    number: "Fråga 8",
    question: "Vad heter Linas syskon?",
    alternatives: [
        {alternative: "Jennie", isCorrect: true},
        {alternative: "Isabella", isCorrect : true},
        {alternative: "Martin", isCorrect: false},
        {alternative: "Fanny", isCorrect: true}
    ]
},
{
    number: "Fråga 9",
    question: "Linas bästa kompis är av motsatt kön?",
    alternatives: [
        {alternative: "Sant", isCorrect: false},
        {alternative: "Falskt", isCorrect: true}
    ]
},
{
    number: "Fråga 10",
    question: "Vilken årstid tycker Lina är den bästa?",
    alternatives: [
        {alternative: "Vår", isCorrect: false},
        {alternative: "Sommar", isCorrect: true},
        {alternative: "Höst", isCorrect : false},
        {alternative: "Vinter", isCorrect: false}
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
let grade = document.querySelector("#grade");
let totalPoints = 0;
let allPoints = questionArray.length;
let ul = document.querySelector("#ul");
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
    let questionArrayAlt = questionArray[questionIndex].question;
    questionText.innerText = questionArrayAlt;
    let alt = questionArray[questionIndex].alternatives;
    let trueAlternatives = 0;

    let questionLi = document.createElement("li");
    questionLi.innerText = questionArrayAlt;
    questionLi.classList.add("question");
    ul.append(questionLi);

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
    let checkIfCorrect = () => {
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

        // en funktion som ska filtrerar vår array på värdet "true" för att vi ska kunna
        // jämnföra om checkade true är lika med alla true svarsalternativ
        let checkTrue = (check) => {
            return check === "true";
        };
        let resultCounter = answerArray.filter(checkTrue).length;

        // en if/else som registrerar en li-tagg med rätt/fel svar till en ordered list
            if (answerArray.includes("false")) {
                let result = document.createElement("li");
                result.innerText = "Fel svar";
                ul.append(result);
            } else if (answerArray.includes("true") && (resultCounter === trueCounter)) {
                totalPoints += 1;
                let result = document.createElement("li");
                result.innerText = "Rätt svar!";
                ul.append(result);
            }

        // tömmer vår array
        answerArray = [];
    
    };

    checkIfCorrect();

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
            points.innerText = "Du fick " + totalPoints + " rätt";

        if (totalPoints / allPoints * 100 < 50) {
            grade.innerText = "Underkänt";
            grade.style.color = "red";
        } else if (totalPoints / allPoints * 100 === 50 || totalPoints / allPoints * 100 <= 75) {
            grade.innerText = "Godkänt";
            grade.style.color = "orange";
        } else {
            grade.innerText = "Mycket väl godkänt!";
            grade.style.color = "green";    
        }

            nextBtn.addEventListener("click", () => {
                answerDiv.classList.remove("hide");
                nextBtn.classList.add("hide");
            });
        }
    }
};

nextBtn.addEventListener("click", ifChecked);
