const FIELD = [];
const BACK = 'Рубашка' + '\n' + 'Очень' + '\n' + 'Красивая'
const alph = 'abcdefghijklmnopqrstuvwxyz'; //тут будет Object с картинками
const OPENEDCARDS = new Set();
let COUNT = 0;

function generateField(sizeX, sizeY) {
    for (let i = 0; i < sizeX; i++) {
        let line = [];
        for (let j = 0; j < sizeY; j++) {
            const card = new Card(sizeX * sizeY)
            line.push(card);
        }
        FIELD.push(line);
    }
}

function checkCards() {
    const [first, second] = OPENEDCARDS;

    if (first.text === second.text) {
        COUNT += 5;
    }

    else {
        COUNT -= 2;
    }

    OPENEDCARDS.clear();
}


generateField(4, 4);

for (let i = 0; i < 4; i++) {
    console.log(FIELD[i].map(x => x.text));
}


for (let i = 0; i < 4; i++) {
    console.log(FIELD[i].map(x => x.swapToFace()).map(x => x.text));
}


for (let i = 0; i < 4; i++) {
    console.log(FIELD[i].map(x => x.swapToBack()).map(x => x.text));
}