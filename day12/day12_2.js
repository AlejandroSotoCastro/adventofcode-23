const fs = require("fs");

// const input = "./day16/testInput.txt";
const input = "./day16/input.txt";
// start timer
console.time("timer");
const grid = [];
const energies = [];
fs.readFile(input, "utf8", (_err, data) => {
    data.split(/\r?\n/).forEach((line) => {
        if (line === "") return;
        const row = line.split("");
        grid.push(row);
    });
});
