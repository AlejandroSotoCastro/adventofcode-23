// import mathjs
const mathjs = require("mathjs");
//19, 13, 30 @ -2,  1, -2
//18, 19, 22 @ -1, -1, -2

// const A = [
//     [1, 0, 2, 0],
//     [0, 1, -1, 0],
//     [1, 0, 0, 1],
//     [0, 1, 0, 1],
// ];
// const b = [19, 13, 18, 19];
// console.log(mathjs.lusolve(A, b));

const fs = require("fs");

// const input = "./day24/testInput.txt";
const input = "./day24/input.txt";
const lines = [];
const testMin = 200000000000000;
const testMax = 400000000000000;
let counter = 0;
fs.readFile(input, "utf8", (_err, data) => {
    //split empty line
    data.split(/\r?\n/).forEach((line, index) => {
        if (!line) return;
        // 19, 13,@ -2,  1,
        const [pointRaw, speedRaw] = line.split(" @ ");
        const point = pointRaw.split(",").map((item) => Number(item));
        const speed = speedRaw.split(",").map((item) => Number(item));

        lines.push({ point, speed });
    });

    // for each pair of lines
    for (let i = 0; i < lines.length; i++) {
        const line1 = lines[i];
        for (let j = i + 1; j < lines.length; j++) {
            const line2 = lines[j];
            const [x, y] = findIntersection(line1, line2);
            if (x === null && y === null) {
                // console.log("Error");
            }
            if (x >= testMin && x <= testMax && y >= testMin && y <= testMax) {
                // console.log(x, y);
                counter++;
            }
        }
    }

    console.log(counter);

    function findIntersection(line1, line2) {
        const [x1, y1] = line1.point;
        const [x2, y2] = line2.point;
        const [dx1, dy1] = line1.speed;
        const [dx2, dy2] = line2.speed;
        const A = [
            [1, 0, -dx1, 0],
            [0, 1, -dy1, 0],
            [1, 0, 0, -dx2],
            [0, 1, 0, -dy2],
        ];
        const b = [x1, y1, x2, y2];

        // console.log(A);
        // console.log(b);
        try {
            // .slice(0, 2);
            const [x, y, t, c] = mathjs.lusolve(A, b);
            if (t < 0 || c < 0) return [null, null];
            return [x, y];
        } catch {
            return [null, null];
        }
    }
});
