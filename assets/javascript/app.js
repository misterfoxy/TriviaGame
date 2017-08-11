//create an object variable for questions
//create a timer function to countdown 20 seconds
//create a timer function for 5 seconds before moving to next questions
//
//timerUp function to check correct or incorrect answer
//variable for right and wrong answers

var correctAnswers = 0;
var incorrectAnswers = 0;

var q1 = {
    question: "What type of bread did Frank Costanza take back from George's girlfriend?",
    answers: ['Marble Rye', 'San Francisco Sourdough', 'Deli Bagels', 'Pumpernickel'],
    flags: [true, false, false, false],
    solution: 'A. Marble Rye'
  };

var q2 = {
    question: "What kind of seafood did Kramer prepare at the Hamptons?",
    answers: ['Crab Legs', 'Lobster Tails', 'Grilled Tuna', 'Mahi Mahi'],
    flags: [false, true, false, false],
    solution: 'B. Lobster Tails'
  };

$(document).ready(function(){

  function makeButtons(q){
    var btnIds=['A', 'B', 'C', 'D'];

    for(var i =0; i<btnIds.length;i++){
      var answerButton = $('<button>');
      answerButton.text(btnIds[i]);
      answerButton.addClass('btn btn-info');
      answerButton.attr('data', q.flags[i]);
      $('#answerButtons').append(answerButton);
    }
  }

  function displayAnswer(q){
    var correct = "The answer was " + q.solution;
    $('#answerButtons').empty();
    $('#questions').empty();
    $('#answers').empty();
    $('#answers').text(correct);

  }

  function startTimer(){
    var countdown = 5;
    var intervalId;

    function run() {
      intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
      countdown--;
      $('#timer').text(countdown);

      if(countdown === 0){
        stop();
        displayAnswer(q1);
      }
    }

    function stop() {
      clearInterval(intervalId);
    }
    run();
  }

  function displaySlide(q){
    $('#questions').text(q.question);
    $('#answers').html("<br>A. "+q.answers[0]+"<br>B. "+q.answers[1]+"<br>C. "+q.answers[2]+"<br>D. " + q.answers[3]);

  }

  function startGame(){
    startTimer();
    displaySlide(q1);
    makeButtons(q1);

    $('button').on("click", function() {
      var answer = $(this).attr('data');
      console.log(answer);

      if(answer === true){
        correctAnswers++;
        console.log("Correct!");

      }
      else{
        incorrectAnswers++;
        console.log("Incorrect!");

      }
    })
  }


  $('#gameStart').on("click",function(){
    $('button').remove();
    startGame();

  });
});
