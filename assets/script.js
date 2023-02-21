
var questions = document.querySelector(".questions");
var wordBlank = document.querySelector(".word-blanks");
var score = document.querySelector(".score");
var startButton = document.querySelector(".start-button");
var optionEL = document.getElementById("option1");
var cardEl= document.querySelector(".card");
var highscoreEl= document.querySelector(".highscore");
var answersBTN;
var j=0;
var blanksLetters=[];


var timer=null;
var timeLimit=60;
var timePassed=0;
var time=timeLimit;
var timeCount = document.getElementById("timer-count");
var correct=false;
var scoreCount=0;
var q=0;



var question1 ={
  question:"What color is the sky?",
  answers:["blue","black","red","green"],
 correct:0
}
var question2={
  question:"What is 1+1",
  answers:["1","2","3","4"],
  correct:1

}
var question3={
  question:"Which of thses animals can swim?",
  answers:["fish","bird","horse","squirrel"],
  correct:0

}
var question4={
  question:"What do you put in food to add flavor",
  answers:["pickles","water","seasoning","juice"],
  correct:2

}
var question5={
  question:"What day is Idependence day?",
  answers:["July 4","June 5", " May 10", "March 7"],
  correct:0

}

var questionArray=[question1,question2,question3,question4,question5];

startButton.addEventListener("click", startGame);



function startGame(){
cardEl.style.display="block";
startButton.style.display="none";
startTimer();
renderSet();
}

function nextSet(){
 checkCorrect();
q++;
if(time===0 || q===questionArray.length){
  gameOver();
}
else{
  renderSet();
}
}

function gameOver(){
timeCount.style.display="none";
optionEL.style.display="none";
questions.style.display="none"
highscoreEl.style.display="block";
renderBlanks();
document.addEventListener("keydown", function(event) {
  var key = event.key.toUpperCase();
  var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
  if (alphabetNumericCharacters.includes(key)) {
    var letterPressed = key;
    enterLetter(letterPressed);
    console.log(letterPressed);
    j++;
  }
})
}
function Correct(){
  scoreCount+=5;
}


function Incorrect(){
time-=5;
}

function checkCorrect(){
if (answersBTN===questionArray[q].answers[questionArray[q].correct]){
    Correct();
}
else{
    Incorrect();
}
}
function startTimer(){
    timer = setInterval(() =>{
      timePassed= timePassed +=1;
      time= timeLimit - timePassed;
        document.getElementById("timer-count").innerHTML = "Time:" + time;
       
      }, 1000);
}

function getScore(){
    var storedScore = localStorage.getItem("scoreCount");
    if (storedScore === null) {
        scoreCount = 0;
      } else {
        scoreCount = storedScore;
      }
      score.textContent = scoreCount;
}

function renderSet(){
questions.textContent= questionArray[q].question;
optionEL.textContent="";
for(var i = 0; i<questionArray[q].answers.length; i++){
answersBTN = document.createElement("button");
answersBTN.setAttribute("class","answers");
answersBTN.textContent=questionArray[q].answers[i];
answersBTN.onclick=nextSet;
optionEL.appendChild(answersBTN);

}
}

function renderBlanks() {
  numBlanks = 3;
  for (var i = 0; i < numBlanks; i++) {
    blanksLetters.push("_");
  } 
  wordBlank.textContent = blanksLetters.join(" ");
}


function enterLetter(letter){
      blanksLetters = letter;
    
    wordBlank.textContent = blanksLetters.join(" ");
  }


function setScore(){
  score.textContent = scoreCount;
  localStorage.setItem("setCount", scoreCount);
}