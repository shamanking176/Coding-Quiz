
var questions = document.querySelector(".questions");
var wordBlank = document.querySelector(".word-blanks");
var score = document.getElementById("score");
var startButton = document.querySelector(".start-button");
var optionEL = document.getElementById("option1");
var cardEl= document.querySelector(".card");
var highscoreEl= document.querySelector(".highscore");
var answersBTN;
var j=0;
var blanksLetters=[];
var finalName=[];
var scoreName = document.querySelector(".scoreName");

var timer=null;
var timeLimit=60;
var timePassed=0;
var time=timeLimit;
var timeCount = document.getElementById("timer-count");
var correct=false;
var scoreCount=0;
var q=0;



var question1 ={
  question:"Commonly used data types do not include",
  answers:["strings","booleans","alerts","numbers"],
 correct:"alerts"
}
var question2={
  question:"The condition in an if/else statement is enclosed with____",
  answers:["quotes","curly brackets","parenthesis","square brackets"],
  correct:"parenthesis"

}
var question3={
  question:"Arrays in JavaScript can be used to store___",
  answers:["numbers and strings","other arrays","booleans","all of the above"],
  correct:"all of the above"

}
var question4={
  question:"String values must be enclosed within___ when being assigned to variables",
  answers:["commas","curly brackets","quotes","parenthesis"],
  correct:"quotes"

}
var question5={
  question:"A useful tool used during developemnt and debugging for printing content is:",
  answers:["Javascript","terminal", "for loops", "console.log"],
  correct:"console.log"

}

var answerArray=["alerts","parenthesis","all of the above","quotes","console.log"];
var questionArray=[question1,question2,question3,question4,question5];
console.log(questionArray[0].correct);

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
  var key = event.key.toLowerCase();
  var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
  if (alphabetNumericCharacters.includes(key)) {
    var letterPressed = key;
    enterLetter(letterPressed);
    
  }
})
highscoreEl.addEventListener("click", function(event){
  scoreName.textContent= finalName;
  localStorage.setItem("scoreName", scoreName);
}
)

}
function Correct(){
  scoreCount+=5;
  console.log("correct");
}


function Incorrect(){
time-=5;
console.log("incorrect");
}

function checkCorrect(){
  for(var i =0; i<4; i++){
if (answersBTN===questionArray[i].correct){
    Correct();
}
else{
    Incorrect();
}
}
}

function startTimer(){
    timer = setInterval(() =>{
      timePassed= timePassed +=1;
      time= timeLimit - timePassed;
        document.getElementById("timer-count").innerHTML = "Time:" + time;
       if(time===0){
        clearInterval(timer);
       }
      }, 1000);
}



function renderSet(){
questions.textContent= questionArray[q].question;
optionEL.textContent="";
for(var i = 0; i<questionArray[q].answers.length; i++){
answersBTN = document.createElement("button");
answersBTN.setAttribute("class","answers");
answersBTN.textContent=questionArray[q].answers[i];
optionEL.appendChild(answersBTN);
answersBTN.onclick=nextSet;
}
}

function renderBlanks() {
  numBlanks = 10;
  for (var i = 0; i < numBlanks; i++) {
    blanksLetters.push("_");
  } 
  wordBlank.textContent = blanksLetters.join(" ");
}


function enterLetter(letter){
  wordBlank.textContent = " ";
  finalName.push(letter);
    
    wordBlank.textContent = finalName.join(" ");
  }


function setScore(){
  localStorage.setItem("scoreCount", scoreCount);
  document.getElementById("score").innerHTML = "Score" + scoreCount;
}
