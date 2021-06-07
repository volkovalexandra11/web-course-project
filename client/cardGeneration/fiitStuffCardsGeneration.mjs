import {backImg, createCard} from "./cardGeneration.mjs";

export function createFiitStuffTemplates(fieldSize) {
    return [
        'ОСИ.jpg',
        'ЯТП.jpg',
        'МАТАН.jpg',
        'АЛГЕМ.png',
        'ХАКЕРДОМ.jpg',
        'КОНТУР.jpg',
        'ФИИТ.jpg',
        'УРФУ.jpg',
        'МАТМЕХ.jpg',
        'ПИТОН.jpg',
    ].slice(0, Math.floor(fieldSize / 2))
        .map(imgName => 'images/fiit stuff/' + imgName)
        .map(faceImg => createCard(backImg, faceImg));
}