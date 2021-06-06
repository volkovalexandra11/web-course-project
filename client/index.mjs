import Game from "./game.mjs";
import Timer from "./timer.mjs";
import {
        createAlphabetCardTemplates,
        createCards,
        refillCardWrapper,
    } from "./cardGeneration.mjs";

function fillSelectRange(select, start, end, defaultValue) {
    for (let optionValue = start; optionValue < end; optionValue++) {
        const option = document.createElement('option');

        option.value = optionValue;
        option.innerText = optionValue;
        if (optionValue === defaultValue) {
            option.selected = true;
        }
        select.append(option);
    }
}

let height;
let width;

function setHeight(value) {
    height = value;
    document.documentElement.style.setProperty('--fieldHeight', height.toString());
}

function setWidth(value) {
    width = value;
    document.documentElement.style.setProperty('--fieldWidth', width.toString());
}

setHeight(3);
setWidth(4);

let game;
let cards = [];

const timerForm = document.querySelector('#timer');
const timer = new Timer(ts => {
    timerForm.value = `${Math.floor(ts / 60)}:${(ts % 60).toString().padStart(2, '0')}`;
});

const score = document.querySelector('#score');

function flipCard(x, y) {
    const card = cards[y * width + x];
    if (!card.classList.contains('flip')) {
        card.classList.add("flip");
    } else {
        card.classList.remove("flip");
    }
}

function onCardClick(e) {
    const card = e.currentTarget;
    console.log(card);
    const [x, y] = [parseInt(card.dataset.x), parseInt(card.dataset.y)];
    console.log(card.dataset);
    console.log(x, y);
    const flipRes = game.flip(x, y);
    score.value = game.score;
    console.log(flipRes);

    if (game.isOver) {
        setTimeout(onWin, 200);
    }

    if (flipRes.alreadyFlipped) {
        return;
    }
    if (flipRes.firstFlipped) {
        flipCard(x, y);
        return;
    }
    if (flipRes.secondFlipCorrect) {
        flipCard(x, y);
        return;
    }
    if (flipRes.secondFlipIncorrect) {
        flipCard(x, y);
        setTimeout(() => { // TODO: чтобы игрок не кликал за это время
                flipCard(x, y);
                flipCard(...flipRes.otherCardCoords)
            }, 400);
        return;
    }
    throw new Error(`Unknown flip result: ${flipRes}`);
}

function onWin() {
    timer.stopTimer();
    alert(`You won! Time: ${timer.currT} seconds. Score: ${game.score}.`);
}

function startGame() {
    resetFieldSize();

    game = new Game(timer, height, width);

    const cardTemplates = createAlphabetCardTemplates(height * width);
    cards = createCards(game, cardTemplates, onCardClick, height, width);
    refillCardWrapper(cards);

    score.value = 0;
    timerForm.value = '0:00';

    timer.resetTimer();
}

function resetFieldSize() {
    const newHeight = parseInt(document.querySelector('#heightSelect').value);
    const newWidth = parseInt(document.querySelector('#widthSelect').value);
    if (newHeight * newWidth % 2 !== 0) {
        alert("Can't create correct matching pairs. Height or width should be an even number!");
        return;
    }
    if (newHeight * newWidth > 52) {
        alert("There are 52 cards currently available! Please select a smaller field.");
        return;
    }

    setHeight(newHeight);
    setWidth(newWidth);
}

window.onload = () => {
    fillSelectRange(document.querySelector('#heightSelect'), 1, 10, height);
    fillSelectRange(document.querySelector('#widthSelect'), 1, 10, width);
    document.querySelector('#restartBtn').addEventListener('click', startGame);

    startGame();
}

window.onclick = () => {
    return true;
}