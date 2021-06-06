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
const score = document.querySelector('#score');

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

function createCards(game, cardTemplates) {
    const newCards = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const fieldId = game.field[y][x].id;
            const newCard = cardTemplates[fieldId].cloneNode(true);

            newCard.dataset.x = x.toString();
            newCard.dataset.y = y.toString();
            newCard.addEventListener("mousedown", onCardClick);

            newCards.push(newCard);

            //newCard.prepend(fieldId.toString());
        }
    }
    return newCards;
}

function refillCardWrapper(cards) {
    const cardWrapper = document.querySelector('.memoryGame');
    cardWrapper.innerHTML = '';

    for (const card of cards) {
        cardWrapper.append(card);
    }
}

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
    stopTimer();
    alert(`You won! Time: ${currT} seconds Score: ${game.score}`);
}

function startGame() {
    resetFieldSize();

    game = new Game(height, width);
    cards = createCards(game, cardTemplates);
    refillCardWrapper(cards);

    score.value = 0;
    timerForm.value = '0:00';
    resetTimer(ts => {
        timerForm.value = `${Math.floor(ts / 60)}:${(ts % 60).toString().padStart(2, '0')}`;
    });
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

    startGame();
}


// <div className="card">
//     <img src="images/front.png" alt="front" className="front">
//     <img src="images/back.jpg" alt="back" className="back">
// </div>