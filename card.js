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
        OPENEDCARDS.add(this);
        return this;
    }

    swapToBack() {
        this.text = BACK;
        OPENEDCARDS.delete(this);
        return this;
    }

}