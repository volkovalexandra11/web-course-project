import Game from "./game.mjs";
import Timer from "./timer.mjs";
import {
    createCardTemplates,
    createCards,
    refillCardWrapper,
} from "./cardGeneration/cardGeneration.mjs";

function fillSelectRange(select, start, end, defaultValue, textNoun) {
    for (let optionValue = start; optionValue < end; optionValue++) {
        const option = document.createElement('option');

        option.value = optionValue;
        option.innerText = optionValue.toString() + ' ' + textNoun + (optionValue !== 1 ? 's' : '');
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

setHeight(4);
setWidth(5);

let game;
let cards = [];

const timerForm = document.querySelector('#timer');
const timer = new Timer(ts => {
    timerForm.value = `${Math.floor(ts / 60)}:${(ts % 60).toString().padStart(2, '0')}`;
});

const score = document.querySelector('#score');

let currUser = null;

const deckSizes = {
    'teachers': 10,
    'alphabet': 52,
    'stuff': 20
};

function flipCard(x, y) {
    const card = cards[y * width + x];
    if (!card.classList.contains('flip')) {
        card.classList.add("flip");
    } else {
        card.classList.remove("flip");
    }
}

function onCardClick(e) {
    if (game.isOver) {
        return;
    }

    const card = e.currentTarget;
    const [x, y] = [parseInt(card.dataset.x), parseInt(card.dataset.y)];
    const flipRes = game.flip(x, y);
    changeScoreTo(game.score);

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
    currUser = prompt(
        `You won! Time: ${timer.currT} seconds. Score: ${game.score}.\n` +
        'You can enter your username to add score to leaderboard',
        currUser !== null ? currUser : ''
    );

    console.log(currUser);
    if (currUser !== null) {
        sendScore(game.score);
    }
}

async function sendScore(score) {
    const resp = await fetch('/api/postScore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: currUser,
            score: score
        })
    });

    if (resp.ok) {
        alert('Score has been successfully saved!');
    } else {
        alert('There has been an error while saving score. Please report it to us');
    }
    console.log(resp);
}

function tryValidateDeck(deckName, fieldSize) {
    const errorMsgs = [];
    if (fieldSize % 2 !== 0) {
        errorMsgs.push("Can't create correct matching pairs. Height or width should be an even number!");
    }
    if (deckSizes[deckName] < fieldSize) {
        errorMsgs.push(`Only ${deckSizes[deckName]} cards are available in this deck.`);
    }
    if (errorMsgs.length > 0) {
        alert(errorMsgs.join('\n'));
        return false;
    }
    return true;
}

function startGame() {
    const newHeight = parseInt(document.querySelector('#heightSelect').value);
    const newWidth = parseInt(document.querySelector('#widthSelect').value);
    const deckName = document.querySelector('#deckSelect').value;

    if (!tryValidateDeck(deckName, newWidth * newHeight)) {
        return;
    }

    setHeight(newHeight);
    setWidth(newWidth);

    game = new Game(timer, height, width);

    const cardTemplates = createCardTemplates(deckName, height * width);
    cards = createCards(game, cardTemplates, onCardClick, height, width);
    refillCardWrapper(cards);

    score.value = 0;
    timerForm.value = '0:00';

    timer.resetTimer();
}

function changeScoreTo(newValue) {
    score.value = newValue;
    score.style.width = (score.value.length + 1).toString() + 'ch';
}

window.onload = () => {
    fillSelectRange(document.querySelector('#heightSelect'), 1, 10, height, 'row');
    fillSelectRange(document.querySelector('#widthSelect'), 1, 10, width, 'column');
    document.querySelector('#restartBtn').addEventListener('click', startGame);
    document.querySelector('#score').addEventListener('change', e => {
        console.log(e);
        console.log(e.target);
        console.log(e.target.style);
        console.log(e.target.value);
        e.target.style.width = (e.target.value.length + 1) + 'ch';
    });

    startGame();
}