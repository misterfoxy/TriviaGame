//global variables
var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ['What is the name of the diner frequented by the gang?', 'What kind of bread did the Costanza family steal back from Julie?'];
var answerArray =[['Who Knows', 'Who Cares', 'Who Wants', 'Huh?'],['Pumpernickel', 'Rye', 'Sourdough', 'French']];
var imageArray = [];
var correctAnswers = ['A. Who Knows','B. Rye'];
var questionCounter = 0;
var selectedAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;

//global functions

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

function generateLossDueToTimeout(){
  unansweredTally++;
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
  $('.mainArea').html(gameHTML);
  setTimeout(wait, 4000);
}

function generateWin(){
  correctTally++;
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
  $('.mainArea').html(gameHTML);
  setTimeout(wait, 4000);
}

function generateLoss(){
  incorrectTally++;
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
  $('.mainArea').html(gameHTML);
  setTimeout(wait, 4000);
}

function generateHTML(){
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
  $('.mainArea').html(gameHTML);
}

function wait(){
  if (questionCounter < 7){
    questionCounter++;
    generateHTML();
    counter = 30;
    timerWrapper();
  }
  else{
    finalScreen();
  }
}

function timerWrapper(){
  theClock = setInterval(thirtySeconds, 1000);

  function thirtySeconds(){
    if(counter === 0){
      clearInterval(theClock);
      generateLossDueToTimeout();
    }
    if (counter > 0){
      counter--;
    }
    $('.timer').html(counter);
  }
}

function finalScreen(){
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
  $(".mainArea").html(gameHTML);
}

function resetGame(){
  questionCounter = 0;
  unansweredTally = 0;
  correctTally = 0;
  incorrectTally = 0;
  counter = 30;
  generateHTML();
  timerWrapper();
}

$(document).ready(function(){
  initialScreen();

  $("body").on("click", ".start-button", function(event){
	event.preventDefault();  // added line to test issue on GitHub Viewer

	generateHTML();

	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;

	selectedAnswer = $(this).text();
  console.log(selectedAnswer);
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){

	resetGame();
});
});
