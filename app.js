
const nameInput = document.querySelector("#name");
const startButtonElement = document.querySelector("#start-button");
const questionContainerElement = document.querySelector("#question-container");
const checkAnswerButtonElement = document.querySelector("#check-answer-button");
const resultMessageElement = document.querySelector("#resultMessage");
const restartButtonElement = document.querySelector("#restart-button");
const scoreBoardElement = document.querySelector("#scoreboard");


let currentName = "";
let correctAnswer = 0;
let questions = [];
let currentQuestionIndex = 0;
let timer;
//! Every question has 2 seconds
const questionTime = 2;


startButtonElement.addEventListener("click", startGame);
checkAnswerButtonElement.addEventListener("click", checkAnswer);
restartButtonElement.addEventListener("click", restartGame);

function startGame() {
     currentName = nameInput.value.trim();
    if(!currentName){
        alert("Enter a name!!!")
        return;
    }
    
    createQuestion();
    callQuestion();
    startButtonElement.disabled = true;
    timer = setInterval(function(){
        questionTime--;
        if(questionTime <= 0){
            endGame();
        }
    }, 1000);
    
}



//!We create a function to call the multiplication table 10 times
function createQuestion() {
    questions = [];
    for (let number = 0; number < 10; number++) {
        const firstNumber = Math.floor(Math.random() * 11);
        const secondNumber = Math.floor(Math.random() * 11);
        const multiplicationResult = firstNumber * secondNumber;
        questions.push({ firstNumber, secondNumber, multiplicationResult });
    }
}

//! to call the question
function callQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionContainerElement.innerHTML = `${question.firstNumber} x ${question.secondNumber} = <input type="number" id="userAnswer">`
    } else {
        endGame();
    }
}

//! to check the answer from user
function checkAnswer() {
    const userAnswerInput = document.getElementById("userAnswer");
    if (!userAnswerInput) {
        return
    }
    const userAnswer = parseInt(userAnswerInput.value);
    const question = questions[currentQuestionIndex] //! to get the position of the current question in the array

    if (userAnswer === question.multiplicationResult) {
        correctAnswer++;
    }
    currentQuestionIndex++;
    userAnswerInput.value = ""; //! to clear the input field

    callQuestion();
}
//! to end the game
function endGame() {
  //  clearInterval(timer);
    questionContainerElement.innerHTML = "";
    resultMessageElement.innerHTML = `${currentName} has ${correctAnswer} correct answers!`;
    saveNameAndScore(currentName, correctAnswer) //! to save user and correct answers
    console.log(correctAnswer);

    displayNameAndScore();
    restartButtonElement.disabled = false //! to active the button
}

//! to save names and points of the answers
function saveNameAndScore(name, score) {
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    console.log(localStorage.getItem("scores"));
    console.log(scores);
    scores.push({ name, score })
    localStorage.setItem("scores", JSON.stringify(scores));
}

//! to show on the scoreboard
function displayNameAndScore() {
    scoreBoardElement.innerHTML = "";
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    console.log(scores);
    scores.sort((a, b) => b.score - a.score) //! to sort the scores from highest to lowest

    scores.forEach((score, index) => {
        const listItem = document.createElement("li");
        listItem.innerText = `${index + 1}.${score.name}: ${score.score} correct answer`;
        scoreBoardElement.appendChild(listItem);
    });
}

function restartGame(){
    currentName = "";
    nameInput.value = "";
    questionContainerElement.innerHTML = "";
    resultMessageElement.innerHTML = "";
    scoreBoardElement.innerHTML = "";
    currentQuestionIndex = 0;
    correctAnswer = 0;
    questions = [];
    startButtonElement.disabled = false;
    restartButtonElement.disabled = false;

}



