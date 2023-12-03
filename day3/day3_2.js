const fs = require("fs");

// const input = "./day3/testInput.txt";
const input = "./day3/input.txt";

fs.readFile(input, "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const xyArray = [];
    data.split(/\r?\n/).forEach((line) => {
        const lineArr = line.split("");
        xyArray.push(lineArr);
    });

    const testArray = [];
    const gears = {};

    // navegate the 2d array
    for (let y = 0; y < xyArray.length; y++) {
        for (let x = 0; x < xyArray[y].length; x++) {
            if (Number(xyArray[y][x]) >= 0) {
                // check if the next item is a number
                let number = xyArray[y][x];
                let numbFlag = true;
                let xCounter = 0;
                while (numbFlag) {
                    xCounter++;
                    if (Number(xyArray[y][x + xCounter]) >= 0) {
                        number += xyArray[y][x + xCounter];
                    } else {
                        numbFlag = false;
                    }
                }
                // check whats before, after, on top and bellow the number
                // check corners
                newX1 = Number(x - 1 < 0 ? x : x - 1);
                newX2 = Number(x + xCounter + 1 > xyArray[y].length ? x + xCounter - 1 : x + xCounter);
                newY1 = Number(y - 1 < 0 ? y : y - 1);
                newY2 = Number(y + 1 < xyArray.length ? y + 1 : y);

                // from y1,x1 to y2,x2
                const adjacent = [];
                // console.log("number: ", number, newY1, newY2, newX1, newX2);
                for (let y1 = newY1; y1 <= newY2; y1++) {
                    for (let x1 = newX1; x1 <= newX2; x1++) {
                        // if it's not a number nor a '.' push true, else push false
                        // if not a number
                        if (!/^\d+$/.test(xyArray[y1][x1]) && xyArray[y1][x1] !== ".") {
                            adjacent.push(true);
                        } else {
                            adjacent.push(false);
                        }
                        if (xyArray[y1][x1] === undefined) {
                            console.log("y1,x1", y1, x1, "ERROR");
                        }
                        if (xyArray[y1][x1] === "*") {
                            const gear = `${y1}${x1}`;
                            if (gears[gear]) {
                                gears[gear].push(number);
                            } else gears[gear] = [number];
                        }
                    }
                }

                // if one is true then push number to testArray

                // console.log(adjacent, number);
                if (adjacent.some((el) => el)) testArray.push(number);
                x += xCounter;
            }
        }
    }
    const gearRatios = Object.keys(gears).map((gear) => {
        if ((gears[gear].length = 2)) {
            const firstGear = Number(gears[gear][0]);
            const secondGear = Number(gears[gear][1]);
            if (firstGear > 0 && secondGear > 0) {
                console.log(firstGear, secondGear);
                return firstGear * secondGear;
            }
        }
    });
    const filteredGears = gearRatios.filter((el) => el);
    const sum = filteredGears.reduce((acc, cur) => acc + cur, 0);
    console.log(sum);
});
