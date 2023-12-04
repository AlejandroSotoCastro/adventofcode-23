const fs = require("fs");

// const input = "./day4/testInput.txt";
const input = "./day4/input.txt";

fs.readFile(input, "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const cards = [];
    data.split(/\r?\n/).forEach((card) => {
        if (!card) return;
        const [cardNumber, cardValues] = card.split(":");
        let [winningNumbers, myNumbers] = cardValues.trim().split("|");
        winningNumbers = winningNumbers
            .trim()
            .split(" ")
            .filter((el) => isNumber(el) && Number(el));
        myNumbers = myNumbers
            .trim()
            .split(" ")
            .filter((el) => isNumber(el) && Number(el));

        // console.log(winningNumbers, myNumbers);

        // check how many of my numbers are in the winning numbers
        const matches = myNumbers.filter((number) => winningNumbers.includes(number));
        cards.push([cardNumber, matches]);
    });
    const cardPoints = cards.map((card) => calculateCardPoints(card));
    // console.log(cardPoints);
    const sum = cardPoints.reduce((acc, curr) => acc + curr);
    console.log(sum);
});

function calculateCardPoints(card) {
    const [cardNumber, matches] = card;
    // console.log(cardNumber, matches);
    // 1 point for first match
    // double points for each match after
    if (matches.length === 0) return 0;
    let points = 0;
    const matchesNumber = matches.length;
    if (matchesNumber > 0) {
        points = 1;
        points = points * 2 ** (matchesNumber - 1);
    }

    return points;
}

function isNumber(number) {
    return /^\d+$/.test(number);
}
