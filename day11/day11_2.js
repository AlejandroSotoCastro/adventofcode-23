const fs = require("fs");

// const input = "./day11/testInput.txt";
const input = "./day11/input.txt";
let grid = [];
const stars = [];
const distances = [];
const TIMES = 1000000 - 1;

fs.readFile(input, "utf8", (_err, data) => {
    data.split(/\r?\n/).forEach((line) => {
        if (!line) return;

        const row = line.split("");
        // if a line is all `.` replace all `.` with `x`
        if (row.every((cell) => cell === ".")) {
            row.forEach((cell, index) => {
                row[index] = "x";
            });
        }
        grid.push(row);
    });

    // Transpose the grid
    const transposedGrid = grid[0].map((_, i) => grid.map((row) => row[i]));

    // Replace rows that are all "." or "x" by rows that are all "x"
    for (let i = 0; i < transposedGrid.length; i++) {
        if (transposedGrid[i].every((cell) => cell === "." || cell === "x")) {
            transposedGrid[i].forEach((_cell, index) => {
                transposedGrid[i][index] = "x";
            });
        }
    }
    // Transpose the grid back
    const newGrid = transposedGrid[0].map((_, i) => transposedGrid.map((row) => row[i]));

    grid = newGrid;
    // grid.forEach((row) => {
    //     console.log(row.join(""));
    // });
    // loop over grid row by row
    for (let i = 0; i < grid.length; i++) {
        const row = grid[i];
        let xCounter = 0;
        // find the index of each star
        for (let j = 0; j < row.length; j++) {
            if (row[j] === "x") {
                xCounter++;
            }
            if (row[j] === "#") {
                let yCounter = 0;
                for (let k = 0; k < i; k++) {
                    if (transposedGrid[j][k] === "x") {
                        yCounter++;
                    }
                }
                stars.push({ x: j + xCounter * TIMES, y: i + yCounter * TIMES });
            }
        }
    }
    console.log(stars.length);

    for (let i = 0; i < stars.length - 1; i++) {
        for (let j = i + 1; j < stars.length; j++) {
            const distance = calculateDistance(stars[i], stars[j]);
            // console.log(`Distance between point ${i + 1} and point ${j + 1}: ${distance}`);
            distances.push(distance);
        }
    }
    // absolute value of the sum of all distances
    const sum = distances.reduce((acc, curr) => acc + curr, 0);
    console.log(sum);

    /**
     * Calculate the distance between two points
     * @param {*} point1
     * @param {*} point2
     * @returns distance between two points
     */
    function calculateDistance(point1, point2) {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        return Math.abs(dx) + Math.abs(dy);
    }
});
