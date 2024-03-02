'use strict';

const scoresView = document.querySelectorAll('.score');
const currentScoresView = document.querySelectorAll('.current-score');
const players = document.querySelectorAll('.player');
const diceImg = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
let winnerPlayer = false;

// Set new Score Function.
let setNewScore = nameScore => {
    for (let i = 0; i < nameScore.length; i++) {
        nameScore[i].textContent = '0';
    }
}

// Check who play
let playing = () => {
    for (let i = 0; i < players.length; i++) {
        if (players[i].classList.contains('player--active')) {
            return i;
        }
    }
}

//Switch
const switchPlayer = () => {
    setNewScore(currentScoresView);
    if (playing() === 0) {
        players[0].classList.remove('player--active');
        players[1].classList.add('player--active');
    } else {
        players[0].classList.add('player--active');
        players[1].classList.remove('player--active');
    }
}

// Handle click New Game and First Start
const newGame = () => {
    setNewScore(scoresView);
    winnerPlayer = false;
    setNewScore(currentScoresView);
    if(players[playing()].classList.contains('player--winner')){
        players[playing()].classList.remove('player--winner')
    }
    if (!players[0].classList.contains('player--active')) {
        switchPlayer();
    }
}
newGame();
btnNewGame.addEventListener('click', newGame);

// Handle click Roll
btnRoll.addEventListener('click', function () {
    if (!winnerPlayer) {
        let rollDice = Math.trunc(Math.random() * 6) + 1;
        diceImg.src = `dice-${rollDice}.png`;
        if (rollDice === 1) {
            switchPlayer();
        } else {
            currentScoresView[playing()].textContent = Number(currentScoresView[playing()].textContent) + rollDice;
        }
    }
})

// Handle click Hold
btnHold.addEventListener('click', function () {
    if (!winnerPlayer) {
        scoresView[playing()].textContent = Number(currentScoresView[playing()].textContent) + Number(scoresView[playing()].textContent);
        if (Number(scoresView[playing()].textContent) >= 100) {
            winnerPlayer = true;
            players[playing()].classList.add('player--winner');
            console.log(playing());
        } else {
            switchPlayer();
        }
    }
})


