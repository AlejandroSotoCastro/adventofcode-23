const fs = require("fs");

// const input = "./day7/testInput.txt";
const input = "./day7/input.txt";
cardValueMap = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
};

// hand type

// Five of a kind
handTypes = {
    6: /([A-Z\d])\1{4}/, // 5 of a kind
    5: /([A-Z\d])\1{3}/, // 4 of a kind
    4: /([A-Z\d])\1{2}([A-Z\d])\2/, // full house
    3: /([A-Z\d])\1{2}/, // 3 of a kind
    2: /([A-Z\d])\1[A-Z\d]?([A-Z\d])\2/, // 2 pair
    1: /([A-Z\d])\1/, // 1 pair
};

const hands = [];
fs.readFile(input, "utf8", (_err, data) => {
    data.split(/\r?\n/).forEach((line) => {
        if (!line) return;
        const [handRaw, bid] = line.split(" ");
        const hand = { hand: handRaw, type: Number(calculateType(handRaw)), bid: Number(bid) };
        hands.push(hand);
    });

    const sortedHands = sortHands(hands);
    const winnings = calcWinnings(sortedHands);
    console.log("winnings: ", winnings);
    const sum = winnings.reduce((a, b) => a + b, 0);
    console.log("sum: ", sum);

    function calculateType(hand) {
        //order array
        const orderedHand = hand.split("").sort((a, b) => {
            return cardValueMap[b] - cardValueMap[a];
        });
        const handString = orderedHand.join("");
        let handType = 0;
        Object.keys(handTypes)
            .reverse()
            .some((type) => {
                // b;a
                if (handTypes[type].test(handString)) {
                    // console.log("hand: ", handString, "type: ", type);
                    handType = type;
                    return true;
                }
            });
        return handType;
    }

    function sortHands(hands) {
        return hands.sort((a, b) => {
            if (a.type === b.type) {
                for (let i = 0; i < a.hand.length; i++) {
                    if (a.hand[i] !== b.hand[i]) {
                        if (i === 5 || i === 4) console.log("HEY HEY HEY", i, a, b);
                        return cardValueMap[b.hand[i]] - cardValueMap[a.hand[i]];
                    }
                }
            }
            return b.type - a.type;
        });
    }

    function calcWinnings(hands) {
        const reverseHand = hands.reverse();
        const winnings = reverseHand.map((hand, index) => {
            return hand.bid * (index + 1);
        });
        return winnings;
    }
});
