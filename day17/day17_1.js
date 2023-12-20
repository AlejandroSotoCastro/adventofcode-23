const fs = require("fs");

const input = "./day17/testInput.txt";
// const input = "./day17/input.txt";
const grid = [];

let currentPoint = { x: 0, y: 0 };

fs.readFile(input, "utf8", (_err, data) => {
    data.split(/\r?\n/).forEach((line, index) => {
        if (!line) return;
        const row = line.split("");
        grid.push(row);
    });

    const width = grid[0].length;
    const height = grid.length;
    const END = { x: width - 1, y: height - 1 };
    let counter = 0;

    const matrix = new Array(height).fill().map(() => new Array(width).fill(Infinity));
    matrix[0][0] = 0;

    console.log(grid);
    console.log(matrix);

    if (uno && counter > 3 && direction !== "U") console.log(getNeighbours(0, 0));

    function getNeighbours(x, y, direction) {
        const neighbours = [];

        if (x > 0) neighbours.push({ x: x - 1, y, direction: "L" });
        if (x < width - 1) neighbours.push({ x: x + 1, y, direction: "R" });
        if (y > 0) neighbours.push({ x, y: y - 1, direction: "D" });
        if (y < height - 1) neighbours.push({ x, y: y + 1, direction: "U" });

        counter++;
        return neighbours;
    }
});
