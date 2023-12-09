const fs = require("fs");

// const input = "./day7/testInput1.txt";
const input = "./day7/input.txt";
cardValueMap = {
    A: 14,
    K: 13,
    Q: 12,
    J: 1,
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

const JOKER = /J/g;

// hand types

handTypes = {
    6: {
        // 5 of a kind
        test: (hand) => {
            const values = Object.values(calcFrequency(hand));
            return values.includes(5);
        },
    },
    5: {
        // 4 of a kind
        test: (hand) => {
            const values = Object.values(calcFrequency(hand));
            return values.includes(4);
        },
    },
    4: {
        // full house
        test: (hand) => {
            const values = Object.values(calcFrequency(hand));
            return values.includes(3) && values.includes(2);
        },
    },
    3: {
        // 3 of a kind
        test: (hand) => {
            const values = Object.values(calcFrequency(hand));
            return values.includes(3);
        },
    },
    2: {
        // 2 pair
        test: (hand) => {
            const values = Object.values(calcFrequency(hand));
            if (values.includes(2)) values.splice(values.indexOf(2), 1);
            return values.includes(2);
        },
    },
    1: {
        test: (hand) => {
            const values = Object.values(calcFrequency(hand));
            return values.includes(2);
        },
    }, // 1 pair
};

// function that returns a map of the cards and their frequency
function calcFrequency(hand) {
    const valueMap = {};
    hand.split("").forEach((card) => {
        valueMap[card] = valueMap[card] ? valueMap[card] + 1 : 1;
    });
    return valueMap;
}
// the test functions are just values.includes

const hands = [];
fs.readFile(input, "utf8", (_err, data) => {
    data.split(/\r?\n/).forEach((line) => {
        if (!line) return;
        const [handRaw, bid] = line.split(" ");
        const hand = { hand: handRaw, type: Number(calculateType(handRaw)), bid: Number(bid) };
        if (hand.hand.match("JJ") && hand.type === 4) {
            const bla = hand.hand;
        }
        hands.push(hand);
    });

    const sortedHands = sortHands(hands);
    const winnings = calcWinnings(sortedHands);
    // console.log("winnings: ", winnings);
    const sum = winnings.reduce((a, b) => a + b, 0);
    console.log("sum: ", sum);

    function calculateType(hand) {
        //order array
        // const orderedHand = hand.split("").sort((a, b) => {
        //     return cardValueMap[b] - cardValueMap[a];
        // });

        let handString = hand;
        if (hand.match(JOKER)) {
            const handWithFz = calcFrequency(hand);
            // { '4': 1, '6': 1, J: 1, T: 2 }
            let cardToReplace = "";
            let cardFqzCounter = 0;
            Object.keys(handWithFz).forEach((card) => {
                if (!card.match(JOKER) && handWithFz[card] > cardFqzCounter) {
                    cardToReplace = card;
                    cardFqzCounter = handWithFz[card];
                }
            });
            // console.log(handWithFz, cardToReplace);
            //find the card with highest frequenciy
            // replace all J by that hand
            handString = handString.replace(JOKER, cardToReplace);
        }

        // get the max value
        // const handString = orderedHand.join("");
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
