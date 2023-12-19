const fs = require("fs");

// const input = "./day18/testInput.txt";
const input = "./day18/input.txt";
const grid = [];
const points = [];
let perimeter = 0;
let currentPoint = { x: 0, y: 0 };

const directMap = {
    0: { direction: "x", way: 1 },
    2: { direction: "x", way: -1 },
    1: { direction: "y", way: 1 },
    3: { direction: "y", way: -1 },
};

fs.readFile(input, "utf8", (_err, data) => {
    data.split(/\r?\n/).forEach((line, index) => {
        if (!line) return;
        const [_plan, _length, color] = line.split(/\s/);

        // color -> (#70c710)
        // substring that removes the (#  and ) and splits the last digit from the rest
        const substring = color.substring(2, color.length - 1);
        const plan = substring.split("").pop();
        // from hex to dec
        const length = parseInt(substring.substring(0, substring.length - 1), 16);
        // console.log(substring, plan, length);

        const direction = directMap[plan].direction;
        const way = directMap[plan].way;
        perimeter += length;
        currentPoint[direction] += length * way;
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
