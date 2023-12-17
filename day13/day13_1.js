const fs = require("fs");

// const input = "./day13/testInput.txt";
const input = "./day13/input.txt";
let counter = 0;
fs.readFile(input, "utf8", (_err, data) => {
    data.split(/\r\n\r\n/).forEach((patternRaw, index) => {
        if (!patternRaw) return;
        // console.log(`Pattern ${index + 1}`);
        counter += summarizePattern(patternRaw);
    });
    console.log(counter);
    function summarizePattern(patternRaw) {
        const pattern = patternRaw.split(/\r?\n/);
        const vertical = mirrorPositions(pattern);
        const transposed = transpose(pattern);
        const horizontal = mirrorPositions(transposed);
        return vertical + horizontal * 100;
    }

    function mirrorPositions(pattern) {
        const arr = rowMirrors(pattern);
        return intersection(arr).reduce((p, c) => p + c, 0);
    }
    function isMirror(left, right) {
        let big, small, reversedBig;

        if (left.length > right.length) {
            [small, big] = [right, left];
            reversedBig = big.split("").reverse().join("").slice(0, small.length);
        } else {
            [small, big] = [left, right];
            reversedBig = big.slice(0, small.length).split("").reverse().join("");
        }

        return reversedBig === small;
    }

    function rowMirrors(pattern) {
        return pattern.map((row) => {
            const lineMirrors = [];
            for (let i = 1; i < row.length; i++) {
                // split the row at i and return both substrings
                const left = row.substring(0, i);
                const right = row.substring(i);
                if (isMirror(left, right)) {
                    lineMirrors.push(i);
                }
            }
            return lineMirrors;
        });
    }

    function intersection(arrays) {
        return arrays.reduce((a, b) => a.filter((c) => b.includes(c)));
    }

    function transpose(matrix) {
        return Array.from(matrix[0]).map((col, i) => matrix.map((row) => row[i]).join(""));
    }
});
