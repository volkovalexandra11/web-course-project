const FIELD = [];
const alph = 'abcdefghijklmnopqrstuvwxyz';

class Card {

    static _usedOnce = new Set();
    static _used = new Set();

    constructor(fieldSize) {
        // this._X = xCoord;
        // this._Y = yCoord;
        this.text = this.generateText(fieldSize);
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
    // for (let j = 0; j < 5; j++) {
    //     console.log(FIELD[i][j].text);
    // }
    console.log(FIELD[i].map(x => x.text));
    // console.log('\n');
    // FIELD.push(line);
}