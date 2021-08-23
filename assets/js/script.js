// DOM elements
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");


const questions = [
    {
        title: 'Which is a function ?',
        choices: ["function ()", "method ()", "variable ()", "class ()"],
        answer: "function ()"
    },
    {
        title: 'Which is a ?',
        choices: ["funcion ()", "method ()", "variable ()", "class ()"],
        answer: "function()"
    },
    {
        title: 'Which is a function ?',
        choices: ["funcion ()", "method ()", "variable ()", "class ()"],
        answer: "function()"
    },
    {
        title: 'Which is a function ?',
        choices: ["funcion ()", "method ()", "variable ()", "class ()"],
        answer: "function()"
    }
]


var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz (){
    var startEl=document.getElementById("start-screen");
    startEl.setAttribute("class","hide");
    questionsEl.removeAttribute("class");

    
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;

    displayFunction();
}

function displayFunction(){
    var currentQuestion = questions[currentQuestionIndex];

    var questionText =document.getElementById("question-title");
    questionText.textContent=currentQuestion.title;

    currentQuestion.choices.forEach (choices=>{
        var choiceItem =document.createElement("button");
        choiceItem.setAttribute("class", "choice");
        choiceItem.setAttribute("value", choices);
        choiceItem.innerText = choices;
        var body = document.getElementById("choices");
        body.appendChild(choiceItem);
        choiceItem.addEventListener('click', choiceChosen);
        
    })

}

function choiceChosen(){
    if (this.value !== questions[currentQuestionIndex].answer){
        time=time-15;
        timerEl.textContent =time;

        feedbackEl.textContent="Incorrect";
        feedbackEl.style.color="red";

    }else{
        feedbackEl.textContent="Correct";
        feedbackEl.style.color="green";
    }

    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {feedbackEl.setAttribute("class", "hide");}, 1000);
  
    // next question
    currentQuestionIndex++;
  
    // time checker
    if (currentQuestionIndex === questions.length) {
      endQuiz();
    } else {
        displayFunction();
    }
}

function endQuiz(){

    var endScreenEl=document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    var userScoreEl= document.getElementById("final-score");
    userScoreEl.textContent= time;

    questionsEl.setAttribute ("class", "hide");
}

function clockTick() {
    // update time
    time--;
    timerEl.textContent = time;
  
    // check if user ran out of time
    if (time <= 0) {
      endQuiz();
    }
  }
  
  function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value;
  
    if (initials !== "") {
      // get saved scores from localstorage, or if not any, set to empty array
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
      // format new score object for current user
      var newScore = {
        score: time,
        initials: initials
      };
  
      // save to localstorage
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
  
      // redirect to next page
      window.location.href = "score.html";
    }
  }
  
  function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
      saveHighscore();
    }
  }
  
  // submit initials
  submitBtn.onclick = saveHighscore;
  
  // start quiz
  startBtn.onclick = startQuiz;
  
  initialsEl.onkeyup = checkForEnter;
  




