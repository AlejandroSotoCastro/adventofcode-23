const fs = require("fs");

// const input = "./day11/testInput.txt";
const input = "./day11/input.txt";
let grid = [];
const stars = [];
const distances = [];

fs.readFile(input, "utf8", (_err, data) => {
    data.split(/\r?\n/).forEach((line) => {
        if (!line) return;

        const row = line.split("");
        // if a line is all `.` duplicate it
        if (line.match(/^[.]+$/)) {
            grid.push(row);
        }
        grid.push(row);
    });
    // loop over grid column by column duplicate columns that only contain `.`
    // Transpose the grid
    const transposedGrid = grid[0].map((_, i) => grid.map((row) => row[i]));

    // Duplicate rows that are all "."
    for (let i = 0; i < transposedGrid.length; i++) {
        if (transposedGrid[i].every((cell) => cell === ".")) {
            transposedGrid.splice(i, 0, [...transposedGrid[i]]);
            i++; // Skip the duplicated row
        }
    }
    // Transpose the grid back
    const newGrid = transposedGrid[0].map((_, i) => transposedGrid.map((row) => row[i]));

    grid = newGrid;

    // loop over grid row by row
    for (let i = 0; i < grid.length; i++) {
        const row = grid[i];
        // find the index of each star
        for (let j = 0; j < row.length; j++) {
            if (row[j] === "#") {
                stars.push({ x: j, y: i });
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
