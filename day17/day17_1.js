const fs = require("fs");

const input = "./day17/testInput.txt";
// const input = "./day17/input.txt";
const grid = [];
const S = { x: 0, y: 0, distance: 0, weight: 0 };
const unvisited = new Map();
const visited = new Map();
let direction = "R";
let stepCounter = 0;

fs.readFile(input, "utf8", (_err, data) => {
    data.split(/\r?\n/).forEach((line, index) => {
        if (!line) return;
        const row = line.split("");

        grid.push(row);
        for (let i = 0; i < row.length; i++) {
            unvisited.set(`${i},${index}`, { x: i, y: index, weight: Number(row[i]), distance: Infinity });
        }
    });
    const width = grid[0].length;
    const height = grid.length;
    const end = {
        x: width - 1,
        y: height - 1,
        weight: Number(grid[height - 1][width - 1]),
        distance: Infinity,
    };
    let flag = true;
    let currentPoint = { ...S };
    // replace S distance with 0 in unvisited
    unvisited.set(`${S.x},${S.y}`, S);
    unvisited.set(`${end.x},${end.y}`, end);
    while (flag) {
        const neighbors = getNeighbors(currentPoint.x, currentPoint.y);
        forLoop: for (let i = 0; i < neighbors.length; i++) {
            const neighborCords = neighbors[i];
            if (stepCounter === 3 && direction === neighborCords.direction) {
                continue forLoop;
            }
            const neighbor = unvisited.get(`${neighborCords.x},${neighborCords.y}`);
            if (!neighbor) {
                console.log("ehS");
                continue forLoop;
            }
            neighbor.direction = neighborCords.direction;
            const distance = currentPoint.distance + neighbor.weight;
            if (distance < neighbor.distance) {
                neighbor.distance = distance;
                unvisited.set(`${neighbor.x},${neighbor.y}`, neighbor);
            }
        }
        // remove currentPoint from unvisited
        unvisited.delete(`${currentPoint.x},${currentPoint.y}`);
        // add currentPoint to visited
        visited.set(`${currentPoint.x},${currentPoint.y}`, currentPoint);
        if (currentPoint.x === end.x && currentPoint.y === end.y) {
            flag = false;
            break;
        }
        // get the next currentPoint
        let min = Infinity;
        unvisited.forEach((point) => {
            if (point.distance < min) {
                min = point.distance;
                currentPoint = point;
            }
        });
        if (min === Infinity) {
            flag = false;
            break;
        }
        if (currentPoint.direction !== direction) {
            stepCounter = 0;
            direction = currentPoint.direction;
        } else {
            stepCounter++;
        }
    }

    console.log(visited);
    // console.log(matrix);

    function getNeighbors(x, y) {
        const neighbors = [];

        if (x > 0) neighbors.push({ x: x - 1, y, direction: "L" });
        if (x < width - 1) neighbors.push({ x: x + 1, y, direction: "R" });
        if (y > 0) neighbors.push({ x, y: y - 1, direction: "U" });
        if (y < height - 1) neighbors.push({ x, y: y + 1, direction: "D" });

        return neighbors;
    }
});
