const fs = require("fs");

// const input = "./day16/testInput.txt";
const input = "./day16/input.txt";
// start timer
console.time("timer");
const grid = [];
const energies = [];
fs.readFile(input, "utf8", (_err, data) => {
    data.split(/\r?\n/).forEach((line) => {
        if (line === "") return;
        const row = line.split("");
        grid.push(row);
    });

    // vertical
    for (let i = 0; i < grid[0].length; i++) {
        // for every tile in the top row and looking down
        energies.push(calculateEnergy({ x: i, y: 0, direction: "y", way: 1 }));
        // for every tile in the bottom row and looking up
        energies.push(calculateEnergy({ x: i, y: grid.length - 1, direction: "y", way: -1 }));
    }
    // horizontal
    for (let i = 0; i < grid.length; i++) {
        // for every tile in the left row and looking right
        energies.push(calculateEnergy({ x: 0, y: i, direction: "x", way: 1 }));
        // for every tile in the right row and looking left
        energies.push(calculateEnergy({ x: grid[0].length - 1, y: i, direction: "x", way: -1 }));
    }

    const highestEnergy = energies.reduce((p, c) => {
        if (c > p) return c;
        return p;
    }, 0);
    console.log(highestEnergy);
    // end timer
    console.timeEnd("timer");

    function calculateEnergy(startingNode) {
        const nodes = [startingNode];
        const enerTiles = {};
        let direction = "x";
        let way = 1;
        while (nodes.length > 0) {
            const node = nodes.shift();
            // init node
            direction = node.direction;
            way = node.way;
            let currentPoint = { x: node.x, y: node.y };

            let flag = true;
            while (flag) {
                // out of bounds
                if (outOfBounds(currentPoint)) {
                    flag = false;
                    continue;
                }
                if (haveIBeenHere(currentPoint)) {
                    flag = false;
                    continue;
                }
                energizeTile(currentPoint);
                const symbol = grid[currentPoint.y][currentPoint.x];
                if (symbol === "/" || symbol === "\\") {
                    rotate(symbol);
                }
                if (symbol === "|" || symbol === "-") {
                    const wasSplit = split(symbol, currentPoint);
                    if (wasSplit) {
                        flag = false;
                        continue;
                    }
                }
                // advance
                currentPoint = advance(currentPoint);
            }
        }
        return Object.keys(enerTiles).length;

        function split(symbol, currentPoint) {
            let node = { x: currentPoint.x, y: currentPoint.y };
            if (symbol === "|" && direction === "x") {
                // split in 2
                node = { ...node, y: currentPoint.y + 1, direction: "y", way: 1 };
                nodes.push(node);
                nodes.push({ ...node, y: currentPoint.y - 1, way: -1 });
                return true;
            }
            if (symbol === "-" && direction === "y") {
                // split in 2
                node = { ...node, x: currentPoint.x + 1, direction: "x", way: 1 };
                nodes.push(node);
                nodes.push({ ...node, x: currentPoint.x - 1, way: -1 });
                return true;
            }
        }

        function advance(currentPoint) {
            if (direction === "x") {
                return { x: currentPoint.x + way, y: currentPoint.y };
            } else {
                return { x: currentPoint.x, y: currentPoint.y + way };
            }
        }

        function rotate(symbol) {
            toggleDirection();
            if (symbol === "/") {
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
        function energizeTile(currentPoint) {
            const { x, y } = currentPoint;
            const tag = `y${y}x${x}`;
            const subTag = `d${direction}w${way}`;
            if (!enerTiles[tag]) {
                enerTiles[tag] = {};
            }
            enerTiles[tag][subTag] = true;
        }

        function haveIBeenHere(currentPoint) {
            const { x, y } = currentPoint;
            const tag = `y${y}x${x}`;
            const subTag = `d${direction}w${way}`;
            if (!enerTiles[tag]) {
                return false;
            }
            if (!enerTiles[tag][subTag]) {
                return false;
            }
            return true;
        }
        function outOfBounds(point) {
            if (point.x < 0 || point.x >= grid[0].length || point.y < 0 || point.y >= grid.length) {
                return true;
            }
            return false;
        }
    }
});
