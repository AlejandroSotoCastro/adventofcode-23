const fs = require("fs");

// const input = "./day10/testInput4.txt";
const input = "./day10/input.txt";
const grid = [];
const S = { x: 0, y: 0, symbol: "S" };
const map = {
    ".": null,
    "│": { x: 0, y: 1, rot: 0 },
    "─": { x: 1, y: 0, rot: 0 },
    "└": { x: 1, y: 1, rot: 90 },
    "┘": { x: 1, y: 1, rot: -270 },
    "┐": { x: 0, y: 1, rot: -90 },
    "┌": { x: 1, y: 1, rot: 270 },
};

// can be x or y
let initialDirection = "x";
let direction = initialDirection;
// can be 1 or -1
let initialWay = -1;
let way = initialWay;

fs.readFile(input, "utf8", (_err, data) => {
    data.split(/\r?\n/).forEach((line, index) => {
        if (!line) return;
        const formatedLine = line
            .replace(/-/g, "─")
            .replace(/\|/g, "│")
            .replace(/F/g, "┌")
            .replace(/7/g, "┐")
            .replace(/L/g, "└")
            .replace(/J/g, "┘");

        const row = formatedLine.split("");
        const isThereS = row.findIndex((pipe) => pipe === S.symbol);
        if (isThereS >= 0) {
            S.x = isThereS;
            S.y = index;
        }
        grid.push(row);
    });
    console.log(grid);
    console.log(S);

    let currentPoint = S;
    let flag = true;
    let steps = 0;
    let tries = 0;
    while (flag) {
        // take the cordinates of the previous point. check whats on the next point based on direction and way
        if (direction === "x") {
            nextPoint = {
                x: currentPoint.x + way,
                y: currentPoint.y,
            };
        } else {
            nextPoint = {
                x: currentPoint.x,
                y: currentPoint.y + way,
            };
        }
        if (outOfBounds(nextPoint)) {
            tryAgain();
            continue;
        }
        nextPoint.symbol = grid[nextPoint.y][nextPoint.x];
        steps++;
        // check we are not in a fake loop
        if (nextPoint.symbol === ".") {
            tryAgain();
            continue;
        }
        if (nextPoint.symbol === "S") {
            flag = false;
            break;
        }
        rotate(map[nextPoint.symbol].rot);
        currentPoint = nextPoint;
    }
    console.log(steps / 2);

    function rotate(degrees) {
        if (degrees === 90 || degrees === -90) {
            toggleDirection();
        } else if (degrees === -270 || degrees === 270) {
            toggleDirection();
            toggleWay();
        }
    }

    function toggleDirection() {
        if (direction === "x") {
            direction = "y";
        } else {
            direction = "x";
        }
    }
    function toggleWay() {
        if (way === 1) {
            way = -1;
        } else {
            way = 1;
        }
    }
    function tryAgain() {
        tries++;
        steps = 0;
        currentPoint = S;
        way = initialWay;
        direction = initialDirection;
        switch (tries) {
            case 1:
                toggleDirection();
                break;
            case 2:
                toggleWay();
                toggleDirection();
                break;
            case 3:
                toggleDirection();
                break;
            default:
                console.error("Something went wrong");
                flag = false;
                break;
        }
    }

    function outOfBounds(point) {
        if (point.x < 0 || point.x >= grid[0].length || point.y < 0 || point.y >= grid.length) {
            return true;
        }
        return false;
    }
});
