const fs = require("fs");

const input = "./day13/testInput.txt";
// const input = "./day13/input.txt";

grid = [];
fs.readFile(input, "utf8", (_err, data) => {
    data.split(/\r\n\r\n/).forEach((patternRaw, index) => {
        if (!patternRaw) return;
        console.log(`Pattern ${index + 1}`);
        summarizePattern(patternRaw);
    });

    function summarizePattern(patternRaw) {
        const pattern = patternRaw.split(/\r?\n/);
        const reversedPattern = pattern.reverse();

        // check if the first row is repeated
        const firstRowRepeated = isRowRepeated(pattern);
        const lastRowRepeated = isRowRepeated(reversedPattern);

        // if first row is =  to row num `firstRowRepeated` then row2 is = to row num `lastRowRepeated`-1 and so on
        let isPattern = false;
        if (firstRowRepeated) {
            isPattern = matchPattern(pattern, firstRowRepeated);
        } else if (lastRowRepeated) {
            isPattern = matchPattern(reversedPattern, lastRowRepeated);
        }

        // const patternTransposed = transpose(pattern);
        console.log(isPattern);
    }

    function transpose(matrix) {
        return matrix[0].map((col, i) => matrix.map((row) => row[i]));
    }

    // function that checks if a certain row is repeated, takes a pattern
    // returns the index of the repeated row or false
    function isRowRepeated(pattern) {
        const row = pattern[0];

        // from the last row to the second row
        for (let i = pattern.length - 1; i > 0; i--) {
            if (pattern[i] === row) {
                return i;
            }
        }
        return false;
    }
    function matchPattern(pattern, isRowRepeatedIndex) {
        let flag = true;
        outerLoop: for (let i = 0; i < isRowRepeatedIndex / 2; i++) {
            for (let j = isRowRepeatedIndex; j > 0; j--) {
                if (pattern[i] !== pattern[j]) {
                    flag = false;
                    break outerLoop;
                }
            }
        }
        return flag;
    }
});
