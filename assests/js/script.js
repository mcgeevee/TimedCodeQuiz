var body = document.querySelector("body");
var timer = document.querySelector("#time");
var instructions = document.querySelector(".instructions");
var beginButtonClick = document.querySelector("#beginButton");
var questionP = document.querySelector(".question");
var choicesBlock = document.querySelector(".choices");
var result = document.querySelector(".result");
var finalScore = document.querySelector(".final-score");
var endOfGame = document.querySelector(".end-of-game");

var buttonAnswerA = document.querySelector("#answer1");
var buttonAnswerB = document.querySelector("#answer2");
var buttonAnswerC = document.querySelector("#answer3");
var buttonAnswerD = document.querySelector("#answer4");

var submitInitials = document.querySelector(".initial-form");

var currentTime = timer.textContent;
var currentQuestion = 0;

//This will initialize the high score to 0 if there isn't one in local storage. 
var highScore = localStorage.getItem("highscore");
if (highScore === null) {
    localStorage.setItem("highScore", 0);
    highScore = 0;
}

var questions = [{
        ask: "What year was the first Iron Man movie released, kicking off the Marvel Cinematic Universe?",
        answers: ["<2005>", "<2008>", "<2010>", "<2012>"],
        correctAnswer: 1
    },
    {
        ask: "What is the name of Thor’s hammer?",
        answers: ["Vanir", "Mjolnir", "Aesir", "Norn"],
        correctAnswer: 1
    },
    {
        ask: "What is Captain America’s shield made of?",
        answers: ["Adamantium", "Vibranium", "Promethium", "Carbonadium"],
        correctAnswer: 1
    },
    {
        ask: "What is the real name of the Black Panther?",
        answers: ["T'Challa", "M'Baku", "N'Jadaka", "N'Jobu"],
        correctAnswer: 0
    },
    {
        ask: "What is the alien race Loki sends to invade Earth in The Avengers?",
        answers: ["The Chitauri", "The Skrulls", "The Kree", "The Flerkens"],
        correctAnswer: 0
    },
    {
        ask: "Who was the last holder of the Space Stone before Thanos claims it for his Infinity Gauntlet?",
        answers: ["‘Thor", "Loki", "The Collector", "Tony Stark"],
        correctAnswer: 1
    },
    {
        ask: "About which city do Hawkeye and Black Widow often reminisce?",
        answers: ["Budapest", "Prague", "Istanbul", "Sokovia"],
        correctAnswer: 0
    },
    {
        ask: "Where do Lady Sif and Volstagg keep the Reality Stone after the Dark Elves tried to steal it?",
        answers: ["On Vormir", "In a vault on Asgaurd", "Inside Sif's sword", "to the Collector"],
        correctAnswer: 3
    },
    {
        ask: "What does the Winter Soldier say after Steve recognizes him for the first time?",
        answers: ["Who the hell is Bucky?", "Do I know you?", "He's gone.", "What did you say?"],
        correctAnswer: 0
    },
    {
        ask: "What word does Tony utter that makes Steve say, “Language”?",
        answers: ["Crap!", "A$$hole!", "Shit!", "Idiot!"],
        correctAnswer: 2
    },
    {
        ask: "What animal does Darren Cross unsuccessfully shrink in the Ant-Man?",
        answers: ["Mouse", "Sheep", "Duck", "Hamster"],
        correctAnswer: 1
    }
]

function quizQuestion(timerInterval) {
    checkTime(timerInterval);

    // This checks to make sure the questions have not all been answered before displaying on the page.
    if (currentQuestion < questions.length) {
        questionP.textContent = questions[currentQuestion].ask;

        buttonAnswerA.textContent = questions[currentQuestion].answers[0];
        buttonAnswerB.textContent = questions[currentQuestion].answers[1];
        buttonAnswerC.textContent = questions[currentQuestion].answers[2];
        buttonAnswerD.textContent = questions[currentQuestion].answers[3];
    } else {
        endGame();
    }
}

function checkAnswer() {
    // This removes the focus on the button after clicking
    this.style.outline = "none";

    // This checks the button selected to see if it is the correct answer
    if ((this.textContent) == (questions[currentQuestion].answers[questions[currentQuestion].correctAnswer])) {
        result.textContent = "CORRECT";
    } else {
        currentTime -= 10;
        result.textContent = "WRONG";
        if (currentTime < 1) {
            endGame();
        }
    }

    currentQuestion++;

    quizQuestion();
}

// This checks to make sure there is still time left.
function checkTime(timerInterval) {
    if (currentQuestion == questions.length) {
        clearInterval(timerInterval);
        endGame();
    } else if (currentTime <= 0) {
        timer.textContent = 0;
        currentTime = 0;
        clearInterval(timerInterval);
        endGame();
    }
}

function endGame() {
    questionP.style.display = "none";
    choicesBlock.style.display = "none";
    result.style.display = "none";
    endOfGame.style.display = "block";

    // This checks to see if the user's score is the new high score.
    if (currentTime > parseInt(localStorage.getItem("highScore"))) {
        finalScore.textContent = ("You have the new high score! Your final score is " + currentTime + ".");
    } else {
        finalScore.textContent = ("Your final score is " + currentTime + ".");
    }
}

// This stores the user's score in local storage.
function resetGame() {
    var user_initials = document.querySelector("#user_initials").value;

    localStorage.setItem("highScore", currentTime);
    localStorage.setItem(user_initials, currentTime);
}

// Call back function 
beginButtonClick.addEventListener("click", function () {
    var timerStart = setInterval(function () {
        currentTime--;
        timer.textContent = currentTime;
        checkTime(timerStart);
    }, 1000)

    instructions.style.display = "none";
    choicesBlock.style.display = "block";

    quizQuestion(timerStart);
})

// This assigns event listeners to all the answer choices.
var buttons = document.querySelectorAll(".answer-choice").forEach(function (item) {
    item.addEventListener("click", checkAnswer);
})