const fs = require("fs");
const { lcm } = require("mathjs");
// const input = "./day8/testInput2.txt";
const input = "./day8/input.txt";

fs.readFile(input, "utf8", (_err, data) => {
    const [instRaw, nodesRaw] = data.split(/\r\n\r\n/);
    const instructions = instRaw.split("");
    const nodes = {};
    nodesRaw.split(/\r?\n/).forEach((node) => {
        if (!node) return;
        const [name, value] = node.split(" = ");
        const [L, R] = value.substring(1, value.length - 1).split(", ");
        nodes[name] = { L, R };
    });

    const start = /[A-Z]{1,2}A$/g;
    const end = /[A-Z]{1,2}Z$/g;
    let nodeNames = Object.keys(nodes).filter((name) => name.match(start));
    let allSteps = [];
    nodeNames.forEach((nodeName) => {
        let index = 0;
        let steps = 0;
        while (!nodeName.match(end)) {
            if (index > instructions.length - 1) {
                index = 0;
            }
            const node = nodes[nodeName];
            const instruction = instructions[index];
            nodeName = node[instruction];
            index++;
            steps++;
        }
        allSteps.push(Number(steps));
    });

    const stepsLCM = lcm(...allSteps);
    console.log(allSteps);
    console.log(stepsLCM);
});
