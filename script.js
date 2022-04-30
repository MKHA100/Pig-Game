"use strict";

let score = [0, 0];
let activePlayer = 0;
let currentScore = 0;

const dice = document.querySelector(".dice");
const currentPlayer = document.getElementById(`current--${activePlayer}`);
const scoreId = document.getElementById(`score--${activePlayer}`);
const activeTernary = document.getElementById(
  `player${activePlayer === 0 ? 1 : 0}`
);

const game = function () {
  dice.removeAttribute("hidden", "");
  let randomNumber = Math.floor(Math.random() * 6) + 1;

  dice.src = `images/dice-${randomNumber}.png`;

  if (randomNumber === 1) {
    document
      .getElementById(`player${activePlayer}`)
      .classList.remove("player--active");
    activeTernary.classList.add("player--active");
    currentPlayer.textContent = 0;
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    currentScore = 0;
  } else {
    currentScore += randomNumber;
    currentPlayer.textContent = currentScore;
  }

  if (currentScore + score[activePlayer] >= 50) {
    document.querySelector("body").style.cssText =
      "background-image: linear-gradient(to top left, #28b487, #7dd56f);";
    scoreId.textContent = score[activePlayer] + currentScore;
    document.querySelector(".main").classList.add("dissable");
    document.querySelector(".winner").innerHTML = `Player ${
      activePlayer === 0 ? 1 : 2
    } is the winner`;
  }
};

document.querySelector(".btn--roll").addEventListener("click", game);

document.querySelector(".btn--hold").addEventListener("click", function () {
  document
    .getElementById(`player${activePlayer}`)
    .classList.remove("player--active");
  activeTernary.classList.add("player--active");
  score[activePlayer] += currentScore;
  scoreId.textContent = score[activePlayer];
  currentPlayer.textContent = 0;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  currentScore = 0;

  game();
});

document.querySelector(".btn--new").addEventListener("click", function () {
  function zeroValue(name) {
    let elementArray = document.getElementsByClassName(name);
    for (let i = 0; i < elementArray.length; i++) {
      elementArray[i].textContent = 0;
    }
  }

  zeroValue("current-score");
  zeroValue("score");

  activePlayer = 0;
  score = [0, 0];

  currentScore = 0;

  document.querySelector(".winner").innerHTML = ``;
  document.querySelector("body").style.cssText =
    "background-image: linear-gradient(to top left, #753682 0%, #bf2e34 100%);";
  document.querySelector(".main").classList.remove("dissable");
});
