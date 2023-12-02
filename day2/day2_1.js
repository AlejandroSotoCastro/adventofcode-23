const fs = require("fs");

// const input = "./day2/testInput.txt";
const input = "./day2/input.txt";

fs.readFile(input, "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    counter = 0;
    data.split(/\r?\n/).forEach((line) => {
        //take id
        //Game + id
        const [gameId, boxes] = line.split(":");
        const id = Number(gameId.split(" ")[1]);
        if (id > 0) {
            // split on comma to make each block
            const sets = boxes.split(";").map((el) => el.trim());
            // console.log("boxes", sets);
            // split on space to clasify each block and add
            const game = [];
            sets.forEach((set) => {
                const colors = {
                    red: 0,
                    green: 0,
                    blue: 0,
                };
                const boxes = set.split(",").map((el) => el.trim());
                boxes.forEach((box) => {
                    const [number, color] = box.split(" ");
                    colors[color] += Number(number);
                });
                game.push(validateGame(colors));
            });
            if (game.every((el) => el)) {
                counter += id;
            }
        }
    });
    console.log(counter);
});

function validateGame(game) {
    maxRed = 12;
    maxGreen = 13;
    maxBlue = 14;

    return game.red <= maxRed && game.green <= maxGreen && game.blue <= maxBlue;
}
