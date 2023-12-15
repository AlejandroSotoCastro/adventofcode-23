const fs = require("fs");
const { mod } = require("mathjs");

// const input = "./day15/testInput.txt";
const input = "./day15/input.txt";

counter = 0;
fs.readFile(input, "utf8", (_err, data) => {
    //split in coma
    data.split(",").forEach((step) => {
        if (step === "") return;
        counter += calculateHash(step.trim());
    });
    console.log(counter);
    function calculateHash(string) {
        let currentValue = 0;
        for (let i = 0; i < string.length; i++) {
            currentValue += string.charCodeAt(i);
            currentValue = currentValue * 17;
            currentValue = mod(currentValue, 256);
        }
        return currentValue;
    }
});
