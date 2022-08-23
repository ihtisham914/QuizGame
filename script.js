"use strick";

// Data Required for the game
// const question1 = {
//   num1: 4,
//   num2: 6,
//   result: 10,
//   options: [12, 10, 23, 18],
// };
// const question2 = {
//   num1: 13,
//   num2: 8,
//   result: 21,
//   options: [18, 20, 21, 15],
// };
// const question3 = {
//   num1: 25,
//   num2: 11,
//   result: 36,
//   options: [30, 34, 36, 29],
// };
// const question4 = {
//   num1: 9,
//   num2: 8,
//   result: 17,
//   options: [17, 13, 12, 20],
// };

// const questions = [question1, question2, question3, question4];

// selecting Elements
const marks = document.querySelector(".marks");
const currentMarks = document.querySelector(".current-marks");
const firstNum = document.querySelector(".first");
const secondNum = document.querySelector(".second");
const optr = document.querySelector(".operator");
const guaid = document.querySelector(".guaid");
const options = document.querySelector(".options");
const option = document.querySelectorAll(".option");
const correctAns = document.querySelector(".crt-ans");
const start = document.querySelector(".start-btn");
const reset = document.querySelector(".reset-btn");
const timerContainer = document.querySelector(".time-cntr");
const labelTimer = document.querySelector(".time");
const pop = document.querySelector(".popup");
const showMarks = document.querySelector(".show-marks");
/////////////////////////////////////////////////////
// FUCNTIIONS DEFINITIONS
const initial = function () {
  firstNum.textContent = "";
  optr.textContent = "";
  secondNum.textContent = "";

  for (let i = 0; i < option.length; i++) {
    option[i].textContent = "";
  }

  currentMarks.textContent = "";
  guaid.textContent = "Click Start Quiz button to start the quiz";
  timerContainer.classList.add("hidden");
  correctAns.classList.add("hidden");
  pop.classList.add("hidden");
  start.classList.remove("hidden");
  reset.classList.add("hidden");
};

let num1, num2;
let timer;

// Initializing state
initial();
const displayQuestion = function () {
  num1 = Math.trunc(Math.random() * 20) + 1;
  firstNum.textContent = num1;

  optr.textContent = "+";

  num2 = Math.trunc(Math.random() * 20) + 1;
  secondNum.textContent = num2;
  guaid.textContent = "Click correct answer from the choices below";

  for (let i = 0; i < option.length; i++) {
    option[i].textContent = Math.trunc(Math.random() * 40) + 1;
  }
  option[Math.trunc(Math.random() * 3) + 0].textContent = Number(num1 + num2);
};

//Timer
const startTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      pop.classList.remove("hidden");
      showMarks.textContent = currentMarks.textContent;
    }
    time--;
  };

  let time = 60;

  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};
///////////////////////////////////////////////////////////////
// EVENTS

// Starting Quiz
start.addEventListener("click", function () {
  start.classList.add("hidden");
  reset.classList.remove("hidden");
  currentMarks.textContent = 0;
  timerContainer.classList.remove("hidden");

  displayQuestion();

  //Timer
  if (timer) clearInterval(timer);
  timer = startTimer();
});

/////////////////////////////////////////////////////
// Answer validation
for (let i = 0; i < option.length; i++) {
  option[i].addEventListener("click", function (e) {
    if (Number(e.target.textContent) === Number(num1 + num2)) {
      currentMarks.textContent++;
      correctAns.classList.remove("hidden");
      correctAns.textContent = "Correct Answer";
      correctAns.style.backgroundColor = "green";
      displayQuestion();
    } else {
      correctAns.classList.remove("hidden");
      correctAns.textContent = "Wrong answer! Try again";
      correctAns.style.backgroundColor = "red";
    }
  });
}

///////////////////////////////////////////////////////////////////
// RESETING THE QUIZ
reset.addEventListener("click", initial);
