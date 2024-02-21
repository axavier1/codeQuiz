// Questions
const questions = [
    {
        question: "1. Javascript is an _____ language.",
        choices: ["a. Object-Oriented", "b. Object-Based", "c. Procedural", "d. None of the above"],
        answer: "a. Object-Oriented"
    },
    {
        question: "2. Which of the following keywords is used to define a variable in Javascript?",
        choices: ["a. var", "b. let", "c. Both", "d. Neither"],
        answer: "c. Both"
    },
    {
        question: "3. What does the Javascript Interpreter do when encountering empty statements?",
        choices: ["a. Throws an error", "b. Ignores it", "c. Gives an alert", "d. none of the above"],
        answer: "b. Ignores it"
    },
    {
        question: "4. Which of the following methods is used to access HTML elements using Javascript?",
        choices: ["a. getElementbyId()", "b. getElementsByClassName()", "c. Both", "d. Neither"],
        answer: "c. Both"
    },
    {
        question: "5. How do you create a Javascript array?",
        choices: ["a. var fruits = 'banana','apple', 'peach';", "b. var fruits = ['banana','apple','peach'];", "c. var fruits = (1:'banana', 2:'apple', 3:'peach');", "d. var fruits = 1 = ('banana'), 2 = ('apple'), 3 = ('peach');"],
        answer: "b. var fruits = ['banana','apple','peach'];"
    },
    {
        question: "6. How do you call a function named myFunction?",
        choices: ["a. call myFunction()", "b. call function myFunction()", "c. myFunction()", "d. call myFunction"],
        answer: "c. myFunction()"
    },
    {
        question: "7. To see if two variables are equal in an if / else statement you would use ____.",
        choices: ["a. =", "b. ==", "c. 'equals'", "d. !="],
        answer: "b. =="
    },
    {
        question: "8. The first index of an array is ____.",
        choices: ["a. 0", "b. 1", "c. 8", "d. any"],
        answer: "a. 0"
    },
    {
        question: "9 . How do you add a comment in a JavaScript?",
        choices: ["a. //This is a comment", "b. <!--This is a comment-->", "c. 'This is a comment", "d. * This is a comment *"],
        answer: "a. //This is a comment"
    },
    {
        question: "10. Which event occurs when the user clicks on an HTML element?",
        choices: ["a. onclick", "b. onchange", "c. onmouseover", "d. onmouseclick"],
        answer: "a. onclick"
    }
];

//Constants to consolidate all getElementsByIds
const elements = {
    timer: document.getElementById("timer"),
    timeLeft: document.getElementById("timeLeft"),
    timesUp: document.getElementById("timesUp"),
    startDiv: document.getElementById("start"),
    startQuizBtn: document.getElementById("start-quiz-button"),
    questionDiv: document.getElementById("questionDiv"),
    questionTitle: document.getElementById("questionTitle"),
    choices: [
      document.getElementById("btn0"),
      document.getElementById("btn1"),
      document.getElementById("btn2"),
      document.getElementById("btn3"),
    ],
    lineBreak: document.getElementById("lineBreak"),
    answerCheck: document.getElementById("answerCheck"),
    summary: document.getElementById("summary"),
    submitInitialBtn: document.getElementById("submitInitialBtn"),
    initialInput: document.getElementById("initialInput"),
    everything: document.getElementById("everything"),
    highScoreSection: document.getElementById("highScoreSection"),
    finalScore: document.getElementById("finalScore"),
    goBackBtn: document.getElementById("goBackBtn"),
    clearHighScoreBtn: document.getElementById("clearHighScoreBtn"),
    viewHighScore: document.getElementById("viewHighScore"),
    listOfHighScores: document.getElementById("listOfHighScores"),
};  

var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;
var totalTime = 151;

//Start timer/quiz
function newQuiz() {
    questionIndex = 0;
    totalTime = 150;
    elements.timeLeft.textContent = totalTime;
    elements.initialInput.textContent = "";
    elements.startDiv.style.display = "none";
    elements.questionDiv.style.display = "block";
    elements.timer.style.display = "block";
    elements.timesUp.style.display = "none";

    var startTimer = setInterval(function() {
        totalTime--;
        elements.timeLeft.textContent = totalTime;
        if (totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            } else {
                elements.timesUp.style.display = "block";
                elements.questionDiv.style.display = "none";
                elements.timer.style.display = "none";
            }
        }
    }, 1000);
    showQuiz();
}

function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    var currentQuestion = questions[questionIndex];
    elements.questionTitle.textContent = currentQuestion.question;
    elements.choices.forEach((choice, index) => {
        choice.textContent = currentQuestion.choices[index];
    });
}

function checkAnswer(answer) {
    elements.lineBreak.style.display = "block";
    elements.answerCheck.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        // Add to score if right
        correctAns++;
        elements.answerCheck.textContent = "Correct!";
    } else {
        // Take away time if wrong
        totalTime -= 10;
        elements.timeLeft.textContent = totalTime;
        elements.answerCheck.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
    }

    questionIndex++;
    // Repeat with the rest of the questions
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        gameOver();
    }
}

function gameOver() {
    elements.summary.style.display = "block";
    elements.questionDiv.style.display = "none";
    elements.startDiv.style.display = "none";
    elements.timer.style.display = "none";
    elements.timesUp.style.display = "block";

    // show final score
    elements.finalScore.textContent = correctAns;
}

// Event listners
function storeHighScores(event) {
    event.preventDefault();
    if (elements.initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    }

    elements.startDiv.style.display = "none";
    elements.timer.style.display = "none";
    elements.timesUp.style.display = "none";
    elements.summary.style.display = "none";
    elements.highScoreSection.style.display = "block";

    // Store scores into local storage
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores);
    }

    var userScore = {
        initials: elements.initialInput.value,
        score: correctAns
    };

    console.log(userScore);
    scoresArray.push(userScore);
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);

    // Show current high scores
    showHighScores();
}

function showHighScores() {
    elements.startDiv.style.display = "none";
    elements.timer.style.display = "none";
    elements.questionDiv.style.display = "none";
    elements.timesUp.style.display = "none";
    elements.summary.style.display = "none";
    elements.highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    // Check if there is any in local storage
    if (savedHighScores === null) {
        elements.listOfHighScores.innerHTML = "No high scores yet.";
        return;
    }

    console.log(savedHighScores);
    var storedHighScores = JSON.parse(savedHighScores);

    // Clear existing high scores list to prevent duplicate entries
    elements.listOfHighScores.innerHTML = "";

    // Create and append new high score entries
    storedHighScores.forEach(score => {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.textContent = `${score.initials}: ${score.score}`;
        elements.listOfHighScores.appendChild(eachNewHighScore);
    });
}

// Starting the quiz
elements.startQuizBtn.addEventListener("click", newQuiz);

elements.choices.forEach((choice, index) => {
    choice.addEventListener('click', () => checkAnswer(index));
});

// Submitting initials to store high scores
elements.submitInitialBtn.addEventListener("click", function(event) {
    storeHighScores(event);
});

// Viewing high scores
elements.viewHighScore.addEventListener("click", showHighScores);

// Going back to the start of the quiz
elements.goBackBtn.addEventListener("click", function() {
    elements.startDiv.style.display = "block";
    elements.highScoreSection.style.display = "none";
});

// Clearing high scores
elements.clearHighScoreBtn.addEventListener("click", function() {
    window.localStorage.removeItem("high scores");
    elements.listOfHighScores.innerHTML = "High Scores Cleared!";
    elements.listOfHighScores.style.fontFamily = "'Press Start 2P'";
    elements.listOfHighScores.style.fontStyle = "italic";
});
