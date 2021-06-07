import {createCardSide} from "./cardGeneration.mjs";


const transparentImg = 'images/Transparent.png';
const backImg = 'images/back.jpg';

const gradientColors = [
    '#9999ff',
    '#66ff66',
    '#cc3399',
    '#ff9900',
    '#00cc00',
    '#009999',
    '#6600ff',
    '#ffccff',
    '#00cc99',
    '#3333ff',
    '#ff99cc',
    '#990099',
    '#339933',
    '#ffcc00',
    '#00ffff',
    '#6600ff',
    '#cc0099',
    '#cc0000',
    '#66ff33',
    '#000066',
    '#7FFF00',
    '#DC143C',
    '#FFD700',
    '#FF1493',
    '#9400D3',
    '#ADFF2F',
    '#FF69B4',
    '#FF00FF',
    '#FFFF00',
    '#DFFF00',
    'red',
    '#0000FF',
    '#00FF00',
    '#8B008B',
    '#CC00FF',
    '#FF0099',
    '#8B0000',
    '#006400',
    '#00FFFF',
    '#000080',
]

export function createGradientCardTemplates(fieldSize) {
    return Array.from( { length: Math.floor(fieldSize / 2) }, _ => createGradCard());
}

function randomDoubleRange(start, end) {
    return Math.random() * (end - start) + start;
}

function randomIntRange(start, end) {
    const randFloat = start + Math.random() * (end - start);
    return Math.floor(randFloat);
}

function createRandomGradFaceSide() {
    const angle = `${randomDoubleRange(-90, +90)}deg`;
    const color = gradientColors[randomIntRange(0, gradientColors.length)];

    const cardFace = document.createElement('img');

    cardFace.src = transparentImg;
    cardFace.alt = 'face';
    cardFace.className = 'face';

    cardFace.style.backgroundImage = `repeating-linear-gradient(${angle},
        #FFF8DC 0px 20px,
        ${color} 20px 40px
    )`;

    console.log(cardFace.style);

    return cardFace;
}

function createGradCard() {
    const card = document.createElement('div');

    const [back, face] = [createCardSide(backImg, true), createRandomGradFaceSide()];
    card.append(back, face);

    card.className = 'card';

    return card;
}