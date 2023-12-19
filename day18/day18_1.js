const fs = require("fs");

// const input = "./day18/testInput.txt";
const input = "./day18/input.txt";
const grid = [];
const points = [];
let perimeter = 0;
let currentPoint = { x: 0, y: 0 };

const directMap = {
    R: { direction: "x", way: 1 },
    L: { direction: "x", way: -1 },
    D: { direction: "y", way: 1 },
    U: { direction: "y", way: -1 },
};

fs.readFile(input, "utf8", (_err, data) => {
    data.split(/\r?\n/).forEach((line, index) => {
        if (!line) return;
        const [plan, length, color] = line.split(/\s/);

        const direction = directMap[plan].direction;
        const way = directMap[plan].way;
        perimeter += Number(length);
        currentPoint[direction] += Number(length) * way;
        points.push([currentPoint.x, currentPoint.y]);
    });
    const area = shoelaceFormula(points);
    const inPoints = area - perimeter / 2 + 1;
    console.log(perimeter);
    console.log(area);
    console.log(inPoints);

    console.log("final", perimeter + inPoints);

    return;

    function shoelaceFormula(points) {
        let area = 0;
        for (let i = 0; i < points.length; i++) {
            let j = (i + 1) % points.length;
            area += points[i][0] * points[j][1];
            area -= points[j][0] * points[i][1];
        }
        return Math.abs(area / 2);
    }
});
