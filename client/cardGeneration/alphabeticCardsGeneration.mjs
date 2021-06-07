import {backImg, createCard} from "./cardGeneration.mjs";

export function createAlphabetCardTemplates(fieldSize) {
    return [...'ABCDEFGHIJKLMOPQRSTUVWXYZ']
        .slice(0, Math.floor(fieldSize / 2))
        .map(letter => `images/latin letters/${letter}.png`)
        .map(letterImg => createCard(backImg, letterImg));
}