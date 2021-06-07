import {backImg, createCard} from "./cardGeneration.mjs";

export function createTeachersTemplates(fieldSize) {
    return [
        'Гейн.jpg',
        'Егоров.jpg',
        'Копейцев.jpg',
        'Пьянзин.jpg',
        'Самунь.jpg',
        'Филатова.jpg',
    ].slice(0, Math.floor(fieldSize / 2))
        .map(imgName => 'images/teachers/' + imgName)
        .map(faceImg => createCard(backImg, faceImg));
}