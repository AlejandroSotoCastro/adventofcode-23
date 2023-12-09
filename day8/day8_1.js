const fs = require("fs");

// const input = "./day8/testInput.txt";
const input = "./day8/input.txt";

const histories = [];
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
    let nodeName = "AAA";
    let index = 0;
    let steps = 0;

    while (nodeName !== "ZZZ") {
        if (index > instructions.length - 1) {
            index = 0;
        }
        const node = nodes[nodeName];
        const instruction = instructions[index];
        nodeName = node[instruction];
        index++;
        steps++;
    }

    console.log(steps);
});
