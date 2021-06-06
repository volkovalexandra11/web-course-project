export function createAlphabetCardTemplates(fieldSize) {
    const backImg = 'images/back.jpg';
    return [...'ABCDEFGHIJKLMOPQRSTUVWXYZ']
        .slice(0, Math.floor(fieldSize))
        .map(letter => `images/${letter}.png`)
        .map((letterImg, index) => createCard(index, backImg, letterImg));
}

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

export function createCards(game, cardTemplates, onCardClick, height, width) {
    const newCards = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const fieldId = game.field[y][x].id;
            const newCard = cardTemplates[fieldId].cloneNode(true);

            newCard.dataset.x = x.toString();
            newCard.dataset.y = y.toString();

            newCard.addEventListener("mousedown", onCardClick);
            newCard.addEventListener("dragstart", e => e.preventDefault()); // TODO

            newCards.push(newCard);
            //newCard.prepend(fieldId.toString());
        }
    }
    return newCards;
}

export function refillCardWrapper(cards) {
    const cardWrapper = document.querySelector('.memoryGame');
    cardWrapper.innerHTML = '';

    for (const card of cards) {
        cardWrapper.append(card);
    }
}