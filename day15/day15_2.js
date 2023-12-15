const fs = require("fs");
const { mod, i } = require("mathjs");

// const input = "./day15/testInput.txt";
const input = "./day15/input.txt";
const boxes = {};

class Lense {
    constructor(label, focalLen) {
        this.label = label;
        this.focalLen = focalLen;
    }
}

class Box {
    constructor(boxNumber) {
        this.boxNumber = boxNumber;
        this.lenses = [];
    }
    pushLens(lense) {
        // if the lense already exists replace it
        const index = this.lenses.findIndex((l) => l.label === lense.label);
        if (this.lenses[index]) {
            this.lenses[index] = lense;
            return;
        }
        this.lenses.push(lense);
    }

    removeLense(label) {
        const index = this.lenses.findIndex((l) => l.label === label);
        if (this.lenses[index]) {
            this.lenses[index] = null;
            this.lenses = this.lenses.filter((lense) => lense !== null);
        }
    }

    calculateFocusingPower() {
        return this.lenses.reduce((acc, curr, index) => {
            return acc + (this.boxNumber + 1) * (index + 1) * curr.focalLen;
        }, 0);
    }
}

fs.readFile(input, "utf8", (_err, data) => {
    //split in coma
    data.split(",").forEach((step) => {
        if (step === "") return;
        // remove \r\ or \n\
        step = step.trim();
        // if there's an = split in =
        if (step.includes("=")) {
            const [label, focalLen] = step.split("=");
            const boxN = manageBoxExistence(label);
            boxes[boxN].pushLens(new Lense(label, focalLen));
        }
        // if theres a - split in -
        if (step.includes("-")) {
            const [label] = step.split("-");
            const boxN = manageBoxExistence(label);
            boxes[boxN].removeLense(label);
        }
    });
    const totalFocusingPower = Object.keys(boxes).reduce((acc, cur) => {
        const box = boxes[Number(cur)];
        const focusPower = box.calculateFocusingPower();
        return acc + focusPower;
    }, 0);

    console.log(totalFocusingPower);

    function calculateHash(string) {
        let currentValue = 0;
        for (let i = 0; i < string.length; i++) {
            currentValue += string.charCodeAt(i);
            currentValue = currentValue * 17;
            currentValue = mod(currentValue, 256);
        }
        return currentValue;
    }

    function manageBoxExistence(lense) {
        const boxN = calculateHash(lense.trim());
        if (!boxes[boxN]) {
            boxes[boxN] = new Box(boxN);
        }
        return boxN;
    }
});
