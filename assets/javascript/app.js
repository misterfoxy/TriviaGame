//global variables
var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ['Which family lives in Queens?', 'What kind of bread did the Costanza family steal back from Julie?','Who invaded Spain in the 8th Century?','In what famous wine country does the Maestro own a home?','What alcohol cannot be detected on your breath?','What catalog did Elaine run while her boss was away in Burma?','What professional sports team does George work for?'];
var answerArray =[['The Costanzas', 'The Seinfelds', 'The Kramers', 'The Beneses?'],['Pumpernickel', 'Rye', 'Sourdough', 'French'],['The Turks','The Moors', 'The Jews', 'The Moops'],['Napa Valley', 'Tuscany', 'Columbia Basin', 'Sicily'],
['Hennigans','Jameson','Johnnie Walker','Bacardi'],['L.L. Bean', 'Brooks Brothers', 'J. Peterman', 'J. Crew'],['Rangers','Yankees','Knicks','Jets']];
var imageArray = ["<img class='center-block img-right' src='assets/images/1.gif'>","<img class='center-block img-right' src='assets/images/2.gif'>","<img class='center-block img-right' src='assets/images/3.gif'>","<img class='center-block img-right' src='assets/images/4.gif'>","<img class='center-block img-right' src='assets/images/5.gif'>","<img class='center-block img-right' src='assets/images/6.gif'>","<img class='center-block img-right' src='assets/images/7.gif'>",];
var correctAnswers = ['A. The Costanzas','B. Rye','D. The Moops', 'B. Tuscany','A. Hennigans','C. J. Peterman','B. Yankees'];
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
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
  $('.mainArea').html(gameHTML);
  setTimeout(wait, 4000);
}

function generateWin(){
  correctTally++;
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
  $('.mainArea').html(gameHTML);
  console.log(imageArray[questionCounter]);
  setTimeout(wait, 4000);
}

function generateLoss(){
  incorrectTally++;
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
  $('.mainArea').html(gameHTML);
  setTimeout(wait, 4000);
}

function generateHTML(){
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
  $('.mainArea').html(gameHTML);
}

function wait(){
  if (questionCounter < 6){
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
