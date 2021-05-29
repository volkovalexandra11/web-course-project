const FIELD = [];
const BACK = 'Рубашка' + '\n' + 'Очень' + '\n' + 'Красивая'
const alph = 'abcdefghijklmnopqrstuvwxyz'; //тут будет Object с картинками

class Card {

    static _usedOnce = new Set();
    static _used = new Set();

    constructor(fieldSize) {
        this.innerText = this.generateText(fieldSize);
        this.text = BACK;
    }

    generateText(fieldSize) {
        const possibleInds = [...Array(Math.floor(fieldSize / 2)).keys()];
        let start = -1;

        while (Card._used.has(start) || start === -1) {
            let start = Math.floor(Math.random()* possibleInds.length);

            if (!Card._usedOnce.has(start)) {
                Card._usedOnce.add(start);
                return alph[start];
            }

            if (Card._usedOnce.has(start) && !Card._used.has(start)) {
                Card._used.add(start);
                possibleInds.splice(start, 1);
                return alph[start];
            }
        }
    }

    swapToFace() {
        this.text = this.innerText;
        return this;
    }

    swapToBack() {
        this.text = BACK;
        return this;
    }

}


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