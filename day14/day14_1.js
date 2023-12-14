const fs = require("fs");

// const input = "./day14/testInput.txt";
const input = "./day14/input.txt";

grid = [];
fs.readFile(input, "utf8", (_err, data) => {
    data.split(/\r?\n/).forEach((line) => {
        if (!line) return;
        const row = line.split("");
        grid.push(row);
    });
    // console.log(grid);
    let somethingHasChanged = true;
    while (somethingHasChanged) {
        somethingHasChanged = false;
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                // the current grid point
                const current = grid[i][j];
                // the grid point above the current one
                const above = grid[i - 1] ? grid[i - 1][j] : null;
                // if above is empty (.) and current point is (O) then swap
                if (above === "." && current === "O") {
                    grid[i][j] = ".";
                    grid[i - 1][j] = "O";
                    somethingHasChanged = true;
                }
            }
        }
    }
    const rocksDistribution = grid.map((row) => {
        return row.reduce((p, c) => {
            if (c === "O") p++;
            return p;
        }, 0);
    });
    console.log(rocksDistribution);
    const totalLoad = rocksDistribution.reduce((p, c, index) => {
        return p + c * (rocksDistribution.length - index);
    }, 0);
    console.log(totalLoad);
    // grid.forEach((row) => {
    //     console.log(row.join(""));
    // });
});
