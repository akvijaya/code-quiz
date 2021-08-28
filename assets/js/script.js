// DOM elements
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");

var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var scoresBtn = document.querySelector("#scores");
var returnBtn = document.querySelector("#return");
var clearBtn = document.querySelector("#clear");

var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

var highscoreEl = document.querySelector("#hgh-scr");


const questions = [
    {
        title: 'Which is a front end development programming language?',
        choices: ["SQL", "Python", "Javascript", "None of the above"],
        answer: "Javascript" 
    },
    {
        title: 'How do we declare a variable',
        choices: ["variable time;", "int time;", "var time;", "time;"],
        answer: "var time;"
    },
    {
        title: 'Which is not a string?',
        choices: ["function", "four", "4", "%"],
        answer: "4"
    },
    {
        title: 'Which is a integer?',
        choices: ["funcion ()", "4", "416-994-5989", "S24"],
        answer: "4"
    }
]


var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz (){
    currentQuestionIndex = 0;
    time = questions.length * 15;

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

    document.getElementById("choices").innerText = "";

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

    }else{
        feedbackEl.textContent="Correct";
    }

    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {feedbackEl.setAttribute("class", "hide");}, 1000);
  
    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
      endQuiz();
    } else {
      displayFunction();
    }
}

function endQuiz(){

    var endScreenEl=document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    clearInterval(timerId);

    var userScoreEl= document.getElementById("final-score");
    userScoreEl.textContent= time;

    questionsEl.setAttribute ("class", "hide");
}

function clockTick() {
    time--;
    timerEl.textContent = time;
  
    if (time <= 0) {
      endQuiz();
    }
}
  
function saveHighscore() {
  var initials = initialsEl.value;

  if (initials !== "") {
    var highscores =JSON.parse(window.localStorage.getItem("highscores")) || [];

    var newScore = {
      score: time,
      initials: initials
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
  }

  console.log(highscores);
  document.getElementById("initials").value = "";
}

function displayHighscore() {
  var startEl=document.getElementById("start-screen");
  startEl.setAttribute("class","hide");

  var endScreenEl=document.getElementById("end-screen");
  endScreenEl.setAttribute ("class", "hide");

  var retrieveData=localStorage.getItem("highscores");

  var highscoreScreenEl=document.getElementById("highscoreslist");
  highscoreScreenEl.removeAttribute("class");

  var highscore= JSON.parse(retrieveData);
  
  console.log(highscore);
  for (let i=0;i<highscore.length;i++){
    var scr= highscore[i].score;
    var name = highscore[i].initials;
   
    var highscoreItem =document.createElement("div");
    highscoreItem.textContent = "Initials: "+ name +" Score: "+ scr;
    
    var body = document.getElementById("highscores");

    body.appendChild(highscoreItem);
  }
}
  
function clearList() {
  document.getElementById("highscores").innerHTML = "";
  localStorage.clear();
}

function returnQuiz() {

  var highscoreScreenEl=document.getElementById("highscoreslist");
  highscoreScreenEl.setAttribute("class","hide");

  var endScreenEl=document.getElementById("end-screen");
  endScreenEl.setAttribute("class", "hide");
  
  var startEl=document.getElementById("start-screen");
  startEl.removeAttribute("class");
  var startEl=document.getElementById("start-screen");
  startEl.setAttribute("class","start");

}

startBtn.onclick = startQuiz;

submitBtn.onclick = saveHighscore;

scoresBtn.onclick = displayHighscore;

clearBtn.onclick = clearList;

returnBtn.onclick = returnQuiz;







