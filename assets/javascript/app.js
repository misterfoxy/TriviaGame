//create an object variable of questions
//create a timer function to countdown 10 seconds
//timerUp function to check correct or incorrect answer
//variable for right and wrong answers

var correctAnswers = 0;
var incorrectAnswers = 0;
var questions = {

  q1: {
    question: "What type of bread did Frank Costanza take back from George's girlfriend?",
    answers: ['Marble Rye', 'San Francisco Sourdough', 'Deli Bagels', 'Pumpernickel'],
    flags: [true, false, false, false],
    solution: 'A. Marble Rye'
  },

  q2: {
    question: "What kind of seafood did Kramer prepare at the Hamptons?",
    answers: ['Crab Legs', 'Lobster Tails', 'Grilled Tuna', 'Mahi Mahi'],
    flags: [false, true, false, false],
    solution: 'B. Lobster Tails'
  }

};

$(document).ready(function(){

  function startTimer(){
    var countdown = 20;
    var intervalId;

    function run() {
      intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
      countdown--;
      $('#timer').text(countdown);

      if(countdown === 0){
        stop();
      }
    }

    function stop() {
      clearInterval(intervalId);
    }
    run();
  }

  function startGame(){
    startTimer();
    $('#questions').text(questions.q1.question);
    $('#answers').html("<br>"+questions.q1.answers[0]+"<br>"+questions.q1.answers[1]+"<br>"+questions.q1.answers[2]+"<br>"+questions.q1.answers[3]);
  }


  $('#gameStart').on("click",function(){
    $('button').remove();
    startGame();
  });
});
