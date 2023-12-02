const fs = require("fs");

// const input = "./day1/testInput.txt";
const input = "./day1/input.txt";

fs.readFile(input, "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const map = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
    };

    counter = 0;
    data.split(/\r?\n/).forEach((line) => {
        let first = "";
        let second = "";

        for (let char = 0; char < line.length; char++) {
            Object.keys(map).forEach((key) => {
                const sub = line.substring(char, line.length);
                if (sub.startsWith(key)) {
                    first = map[key];
                }
            });
            if (first) break;

            const element = Number(line[char]);
            // console.log(element, typeof element ==="number" , element>=0)
            if (typeof element === "number" && element >= 0) {
                first = element;
                break;
            }
        }

        for (let schar = line.length; schar >= 0; schar--) {
            Object.keys(map).forEach((key) => {
                const sub = line.substring(0, schar + 1);
                if (sub.endsWith(key)) {
                    second = map[key];
                }
            });

            if (second) break;
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
