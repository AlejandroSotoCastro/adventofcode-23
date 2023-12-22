const fs = require("fs");

// const input = "./day21/testInput.txt";
const input = "./day21/input.txt";
const grid = [];
const S = { x: 0, y: 0, symbol: "S", distance: 0 };
const unvisited = new Map();
const visited = new Map();

fs.readFile(input, "utf8", (_err, data) => {
    data.split(/\r?\n/).forEach((line, index) => {
        if (!line) return;
        const row = line.split("");
        const isThereS = row.findIndex((pipe) => pipe === S.symbol);
        if (isThereS >= 0) {
            S.x = isThereS;
            S.y = index;
        }
        grid.push(row);
        for (let i = 0; i < row.length; i++) {
            unvisited.set(`${i},${index}`, { x: i, y: index, symbol: row[i], distance: Infinity });
        }
    });
    const width = grid[0].length;
    const height = grid.length;
    let flag = true;
    let currentPoint = { ...S };
    // replace S distance with 0 in unvisited
    unvisited.set(`${S.x},${S.y}`, { ...S, distance: 0 });
    while (flag) {
        const neighbors = getNeighbors(currentPoint.x, currentPoint.y);
        forLoop: for (let i = 0; i < neighbors.length; i++) {
            const neighborCords = neighbors[i];
            const neighbor = unvisited.get(`${neighborCords.x},${neighborCords.y}`);

            if (!neighbor || neighbor.symbol === "#") {
                continue forLoop;
            }
            if (neighbor.symbol === ".") {
                const distance = currentPoint.distance + 1;
                if (distance < neighbor.distance) {
                    neighbor.distance = distance;
                    unvisited.set(`${neighbor.x},${neighbor.y}`, neighbor);
                }
            } else console.error("unknown symbol" + neighbor.symbol);
        }
        // remove currentPoint from unvisited
        unvisited.delete(`${currentPoint.x},${currentPoint.y}`);
        // add currentPoint to visited
        visited.set(`${currentPoint.x},${currentPoint.y}`, currentPoint);
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
        if (currentPoint.distance === 26501366) {
            flag = false;
            break;
        }
    }

    // console.log(grid);
    // filter visited with distance 6  and print
    const filtered = new Map();
    visited.forEach((point) => {
        // even numbers
        if (point.distance % 2 !== 0) {
            filtered.set(`${point.x},${point.y}`, point);
        }
    });

    console.log(filtered.size);
    // console.log(matrix);

    function getNeighbors(x, y) {
        const neighbors = [];

        if (x > 0) neighbors.push({ x: x - 1, y });
        if (x < width - 1) neighbors.push({ x: x + 1, y });
        if (y > 0) neighbors.push({ x, y: y - 1 });
        if (y < height - 1) neighbors.push({ x, y: y + 1 });

        return neighbors;
    }
});
