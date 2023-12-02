const fs = require("fs");

// const input = "./day1/inputsTest.txt";
const input = "./day1/input.txt";

fs.readFile(input, "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    counter = 0;
    data.split(/\r?\n/).forEach((line) => {
        let first = "";
        let second = "";

        for (let char = 0; char < line.length; char++) {
            const element = Number(line[char]);
            // console.log(element, typeof element ==="number" , element>=0)
            if (typeof element === "number" && element >= 0) {
                first = element;
                break;
            }
        }
        for (let schar = line.length; schar >= 0; schar--) {
            const element = Number(line[schar]);
            if (typeof element === "number" && element >= 0) {
                second = element;
                break;
            }
        }

        // append first and second digit
        const key = Number(String(first) + String(second));
        console.log(key);
        //add to counter
        counter += key;
    });
    console.log(counter);
});
