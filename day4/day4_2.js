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
        const [cardNumberStr, cardValues] = card.split(":");
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
        // split on one or more spaces
        const cardNumber = Number(cardNumberStr.split(/\s+/)[1]);
        cards.push({ matches: matches.length, repeats: 1 });
    });
    // console.log(cards)
    cards.forEach((card, index) => {
        // console.log("Card: ", index, "matches: ", card.matches);
        for (let i = 1; i <= card.matches; i++) {
            cards[index + i].repeats += card.repeats;
            // console.log("adding to card: ", index + i);
        }
    });

    console.log(cards);
    const sum = cards.reduce((acc, curr) => acc + curr.repeats, 0);

    console.log(sum);
});

function isNumber(number) {
    return /^\d+$/.test(number);
}
