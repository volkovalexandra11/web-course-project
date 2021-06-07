import {createGradientCardTemplates} from "./gradientCardsGeneration.mjs";
import {createFiitStuffTemplates} from "./fiitStuffCardsGeneration.mjs";
import {createAlphabetCardTemplates} from "./alphabeticCardsGeneration.mjs";
import {createTeachersTemplates} from "./teachersCardsGeneration.mjs";

const templateGenerators = {
    'alphabet': createAlphabetCardTemplates,
    'gradients': createGradientCardTemplates,
    'stuff': createFiitStuffTemplates,
    'teachers': createTeachersTemplates
};

export const backImg = 'images/back.jpg';
// const transparentImg = 'images/Transparent.png';

export function createCardTemplates(deckName, fieldSize) {
    const templateGenerator = templateGenerators[deckName];
    return templateGenerator(fieldSize);
}

// function createAlphabetCardTemplates(fieldSize) {
//     return [...'ABCDEFGHIJKLMOPQRSTUVWXYZ']
//         .slice(0, Math.floor(fieldSize / 2))
//         .map(letter => `images/latin letters/${letter}.png`)
//         .map(letterImg => createCard(backImg, letterImg));
// }

// const gradientColors = [
//     '#9999ff',
//     '#66ff66',
//     '#cc3399',
//     '#ff9900',
//     '#00cc00',
//     '#009999',
//     '#6600ff',
//     '#ffccff',
//     '#00cc99',
//     '#3333ff',
//     '#ff99cc',
//     '#990099',
//     '#339933',
//     '#ffcc00',
//     '#00ffff',
//     '#6600ff',
//     '#cc0099',
//     '#cc0000',
//     '#66ff33',
//     '#000066',
//     '#7FFF00',
//     '#DC143C',
//     '#FFD700',
//     '#FF1493',
//     '#9400D3',
//     '#ADFF2F',
//     '#FF69B4',
//     '#FF00FF',
//     '#FFFF00',
//     '#DFFF00',
//     'red',
//     '#0000FF',
//     '#00FF00',
//     '#8B008B',
//     '#CC00FF',
//     '#FF0099',
//     '#8B0000',
//     '#006400',
//     '#00FFFF',
//     '#000080',
// ]
//
// function createGradientCardTemplates(fieldSize) {
//     return Array.from( { length: Math.floor(fieldSize / 2) }, _ => createGradCard());
// }

// function createFiitStuffTemplates(fieldSize) {
//     return [
//             'ОСИ.jpg',
//             'ЯТП.jpg',
//             'МАТАН.jpg',
//             'АЛГЕМ.png',
//             'ХАКЕРДОМ.jpg',
//             'КОНТУР.jpg',
//             'ФИИТ.jpg',
//             'УРФУ.jpg',
//             'МАТМЕХ.jpg',
//             'ПИТОН.jpg',
//         ].slice(0, Math.floor(fieldSize / 2))
//         .map(imgName => 'images/fiit stuff/' + imgName)
//         .map(faceImg => createCard(backImg, faceImg));
// }

// function randomDoubleRange(start, end) {
//     return Math.random() * (end - start) + start;
// }
//
// function randomIntRange(start, end) {
//     const randFloat = start + Math.random() * (end - start);
//     return Math.floor(randFloat);
// }
//
// function createRandomGradFaceSide() {
//     const angle = `${randomDoubleRange(-90, +90)}deg`;
//     const color = gradientColors[randomIntRange(0, gradientColors.length)];
//
//     const cardFace = document.createElement('img');
//
//     cardFace.src = transparentImg;
//     cardFace.alt = 'face';
//     cardFace.className = 'face';
//
//     cardFace.style.backgroundImage = `repeating-linear-gradient(${angle},
//         #FFF8DC 0px 20px,
//         ${color} 20px 40px
//     )`;
//
//     console.log(cardFace.style);
//
//     return cardFace;
// }

// function createGradCard() {
//     const card = document.createElement('div');
//
//     const [back, face] = [createCardSide(backImg, true), createRandomGradFaceSide()];
//     card.append(back, face);
//
//     card.className = 'card';
//
//     return card;
// }

export function createCardSide(img, isBack) {
    const cardFace = document.createElement('img');
    const sideStr = isBack ? 'back' : 'face';

    cardFace.src = img;
    cardFace.alt = sideStr;
    cardFace.className = sideStr;

    return cardFace;
}

export function createCard(backImg, faceImg) {
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