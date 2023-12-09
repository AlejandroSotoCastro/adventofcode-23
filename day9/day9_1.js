const fs = require("fs");

// const input = "./day9/testInput.txt";
const input = "./day9/input.txt";

const histories = [];
fs.readFile(input, "utf8", (_err, data) => {
    data.split(/\r?\n/).forEach((line) => {
        if (!line) return;
        const history = line.split(" ").map(Number);
        histories.push(history);
    });

    const bla = histories.map((history) => sequenceHistory(history, []));
    const sum = bla.reduce((p, c) => p + c);
    console.log(sum);
    /**
     * returns the value of the history
     */

    function sequenceHistory(history, values) {
        // if history is all 0 return the response
        if (!history.some((value) => value != 0)) {
            return values.reduce((p, c) => p + c);
        }

        let sequence = [];
        // this could probably be a reduce
        for (let i = 0; i < history.length - 1; i++) {
            sequence.push(history[i + 1] - history[i]);
        }
        values.push(history[history.length - 1]);
        return sequenceHistory(sequence, values);
    }
});
