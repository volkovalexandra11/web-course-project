const height = 3;
const width = 4;

document.documentElement.style.setProperty('--fieldWidth', width.toString());
document.documentElement.style.setProperty('--fieldHeight', height.toString());

const backImg = 'images/back.jpg';

const cards = [...'ABCDEFGHIJKLMOPQRSTUVWXYZ']
    .slice(0, height * width)
    .map(letter => `images/${letter}.png`)
    .map(letterImg => createCard(backImg, letterImg));

function createCardSide(img, isBack) {
    const cardFace = document.createElement('img');
    const sideStr = isBack ? 'back' : 'face';

    cardFace.src = img;
    cardFace.alt = sideStr;
    cardFace.className = sideStr;

    return cardFace;
}

function createCard(backImg, faceImg) {
    const card = document.createElement('div');

    const [back, face] = [createCardSide(backImg, true), createCardSide(faceImg, false)];
    card.append(back, face);

    card.className = 'card';

    return card;
}

const cardsWrapper = document.querySelector('.memoryGame');
cardsWrapper.append(...cards);

function flipCard(e) {
    const card = e.currentTarget;
    if (!card.classList.contains('flip')) {
        card.classList.add("flip");
    } else {
        card.classList.remove("flip");
    }
}

cards.forEach(card => {
    card.addEventListener("click", flipCard)
});


// <div className="card">
//     <img src="images/front.png" alt="front" className="front">
//     <img src="images/back.jpg" alt="back" className="back">
// </div>