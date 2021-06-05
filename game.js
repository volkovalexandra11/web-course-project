class Game {
    height = undefined;
    width = undefined;

    field = undefined;

    flippedFirst = undefined;

    openedCards = new Set();

    constructor(height, width) {
        if (width * height % 2 !== 0) {
            throw new Error(`Field should have even number of cards, got size ${width}x${height}`);
        }

        this.height = height;
        this.width = width;
        this.field = generateField(width, height);
    }

    tryFlip(x, y) {

    }
}

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function generateField(width, height) {
    const field = [...Array(height)].map(_ => new Array(width));

    const ids = Array.from({length: Math.floor(width * height / 2)}, (_, i) => i);
    const allIds = ids.concat(ids);
    shuffle(allIds);

    const allCoords = Array.from(
        {length: width * height},
        (_, i) => [Math.floor(i / width), i % width]
    );

    for (let cardInd = 0; cardInd < width * height; cardInd++) {
        [x, y] = allCoords[cardInd];
        field[x][y] = new Card(allIds[cardInd]);
    }
    return field;
}

// const FIELD = [];
// const BACK = 'Рубашка' + '\n' + 'Очень' + '\n' + 'Красивая'
// const OPENEDCARDS = new Set();
// let COUNT = 0;
//
// function generateField(width, height) {
//     for (let i = 0; i < height; i++) {
//         const line = [];
//         for (let j = 0; j < height; j++) {
//             const card = new Card();
//             line.push(card);
//         }
//         FIELD.push(line);
//     }
// }
//
// function checkCards() {
//     const [first, second] = OPENEDCARDS;
//
//     if (first.text === second.text) {
//         COUNT += 5;
//     }
//
//     else {
//         COUNT -= 2;
//     }
//
//     OPENEDCARDS.clear();
// }
//
//
// generateField(4, 4);
//
// for (let i = 0; i < 4; i++) {
//     console.log(FIELD[i].map(x => x.text));
// }
//
//
// for (let i = 0; i < 4; i++) {
//     console.log(FIELD[i].map(x => x.swapToFace()).map(x => x.text));
// }
//
//
// for (let i = 0; i < 4; i++) {
//     console.log(FIELD[i].map(x => x.swapToBack()).map(x => x.text));
// }