var startBtn = document.getElementById("start");
var gameEl = document.getElementById("game");
const question = document.getElementById('question');
var submitBtn = document.getElementById('submit');
var userNameEl = document.getElementById('userName');
var timerEl = document.getElementById('time');
var time =15;
const choices = Array.from(document.getElementsByClassName('choice-text')); // array that will safe questions. I tried to change the order with random Math method but couldn´t. My questions were repeating
let score = 0;
var feedbackEl = document.getElementById('feedback');

// Function to start game after clicking Start button calls function to "change" (actually, "hides") content. Starts timer and gets questions
function startGame() {
  var startScreenEl = document.getElementById("firstScreen");
  startScreenEl.setAttribute("class","hide");
  gameEl.removeAttribute("class");
  availableQuestions = [...questions];
  timerId = setInterval(timerFunction, 1000);
  getNewQuestion();
}


// Function that lets time work down and message when time´s up
function timerFunction() {
  time--;
  timerEl.textContent = time;
  if (time <= 0 ) {
    clearInterval(timerId);
    timerEl.textContent = "Time´s up";
    quizEnd();
  }
}

function  getNewQuestion () {  // function that basically bring questions, evaluates if there are still able question in array. 
  // could be better if the question and choices were random each "refresh".
  if (availableQuestions.length === 0  ) {
    timerEl.textContent = "You´re done!"; // Let´s us output a message to let know the user he/she finished before time ran out
    clearInterval(timerId);
    quizEnd();
  }
  const questionIndex =  0
      currentQuestion = availableQuestions[questionIndex];
      question.innerText = currentQuestion.question;
  
      choices.forEach( choice => {
          const number = choice.dataset['number'];
          choice.innerText = currentQuestion ['choice'+ number];
      });
      availableQuestions.splice(question, 1);
      acceptingAnswers = true;
    };
    choices.forEach((choice) => {
      choice.addEventListener('click', (e) => {
          if (!acceptingAnswers) return;
  
          acceptingAnswers = false;
          const selectedChoice = e.target;
          const selectedAnswer = selectedChoice.dataset['number'];

          if (selectedAnswer == currentQuestion.answer) {
              feedbackEl.textContent = "Correct!";
              score += 10;
          } else{
              feedbackEl.textContent = "Wrong!";
          }
          setTimeout(() => {
              feedbackEl.textContent = ""
              getNewQuestion();
            }, 500);

      });
  });

  startBtn.onclick = startGame;

  function quizEnd() {
    gameEl.setAttribute("class", "hide");
    var endScreenEl = document.getElementById('lastScreen');
    endScreenEl.removeAttribute('class');
    var finalScoreEl = document.getElementById('finalScore');
    finalScoreEl.textContent = score;
  }



function saveHighscore() { // Section took from bootcamp solution couldn´t manage to make work the local storage until I separate in other javascript file and linked  it with this function
  var userName = userNameEl.value.trim();
  if (userName !== '') {
    var highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || [];
    var newScore = {
      score: score,
      userName: userName,
    };
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));
    window.location.href = 'highScores.html';
  }

}
submitBtn.onclick = saveHighscore;

let questions = [
    {
      question: "Commonly used data types DO NOT include:",
      choice1: "strings",
      choice2: "booleans",
      choice3: "alerts",
      choice4: "numbers",
      answer: 3,
    },
    {
      question:"The condition in an if / else statement is enclosed within _________.",
      choice1: "quotes",
      choice2: "curly brackets",
      choice3: "parentheses",
      choice4: "square brackets",
      answer: 3,
    },
    {
      question: "Arrays in JavaScript can be used to store _________.",
      choice1: "numbers and strings",
      choice2: "other arrays",
      choice3: "booleans",
      choice4: "all of the above",
      answer: 4,
    },
    {
      question:"String values must be enclosed within _________ when being assigned to variables.",
      choice1: "commas",
      choice2: "curly brackets",
      choice3: "quotes",
      choice4: "parentheses",
      answer: 3,
    },
    {
      question:"A very useful tool used during development and debugging for printing content to the debugger is:________",
      choice1: "JavaScript",
      choice2: "terminal/bash",
      choice3: "for loops",
      choice4: "console.log",
      answer: 4,
    },
  ];



