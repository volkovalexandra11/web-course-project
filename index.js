// import Game from "./game";

// const Game = require('./game');

const height = 5;
const width = 4;

document.documentElement.style.setProperty('--fieldWidth', width.toString());
document.documentElement.style.setProperty('--fieldHeight', height.toString());

const backImg = 'images/back.jpg';

const cardTemplates = [...'ABCDEFGHIJKLMOPQRSTUVWXYZ']
    .slice(0, Math.floor(height * width))
    .map(letter => `images/${letter}.png`)
    .map((letterImg, index) => createCard(index, backImg, letterImg));

function createCardSide(img, isBack) {
    const cardFace = document.createElement('img');
    const sideStr = isBack ? 'back' : 'face';

    cardFace.src = img;
    cardFace.alt = sideStr;
    cardFace.className = sideStr;

    return cardFace;
}

function createCard(index, backImg, faceImg) {
    const card = document.createElement('div');

    const [back, face] = [createCardSide(backImg, true), createCardSide(faceImg, false)];
    card.append(back, face);

    card.className = 'card';

    return card;
}

const game = new Game(height, width);

const cardsWrapper = document.querySelector('.memoryGame');

const cards = [];
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        const fieldId = game.field[y][x].id;
        const newCard = cardTemplates[fieldId].cloneNode(true);

        newCard.dataset.x = x.toString();
        newCard.dataset.y = y.toString();
        //newCard.prepend(fieldId.toString());

        cards.push(newCard);
        cardsWrapper.append(newCard);
    }
}
//cardsWrapper.append(...cards);



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
    console.log(flipRes);
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

cards.forEach(card => {
    card.addEventListener("click", onCardClick);
});

window.onload = () => {
    startTimer();
}

// <div className="card">
//     <img src="images/front.png" alt="front" className="front">
//     <img src="images/back.jpg" alt="back" className="back">
// </div>