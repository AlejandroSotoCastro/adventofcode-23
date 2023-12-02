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
            const colors = {
                red: 0,
                green: 0,
                blue: 0,
            };
            sets.forEach((set) => {
                const boxes = set.split(",").map((el) => el.trim());
                boxes.forEach((box) => {
                    const [number, color] = box.split(" ");
                    if (Number(number) > colors[color]) colors[color] = Number(number);
                });
            });
            counter += setPower(colors);
        }
    });
    console.log(counter);
});

function setPower(set) {
    return set.red * set.green * set.blue;
}
