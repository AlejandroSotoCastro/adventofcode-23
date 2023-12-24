const fs = require("fs");

const input = "./day19/testInput.txt";
// const input = "./day19/input.txt";

const init = "in";
const basic = { x: 1, m: 1, a: 1, s: 1 };
const MIN = 1;
const MAX = 4000;
fs.readFile(input, "utf8", (_err, data) => {
    //split empty line
    const [workflows, rawRatings] = data.split(/\n\s*\n/).map((line) => line.split(/\r?\n/));
    const map = mapWorkflows(workflows);
    // const ratings = rawRatings.map((rating) => {
    //     return rating
    //         .substring(1, rating.length - 1)
    //         .split(",")
    //         .reduce((acc, curr) => {
    //             const [key, value] = curr.split("=");
    //             acc[key] = value;
    //             return acc;
    //         }, {});
    // });

    // for each rating
    const validPart = 0;
    classifyPart(basic, init);

    // const count = measureAccepted(parts);
    // console.log(count);

    function mapWorkflows(workflows) {
        const map = new Map();
        workflows.forEach((workflow) => {
            const [key, rawValue] = workflow.trim().split("{");
            //remvove last } and split by ,
            const value = rawValue
                .slice(0, -1)
                .split(",")
                .map((item) => item.trim());
            map.set(key, value);
        });
        return map;
    }

    function classifyPart(range, workflowTag) {
        if (!map.has(workflowTag)) workflow === "A" && validPart++;
        // {s<1351:px,qqz}
        // px{a<2006:qkq,m>2090:A,rfg}
        // qqz{s>2770:qs,m<1801:hdj,R}

        const newWorkflows = testWorkflow(workflowTag);
        newWorkflows.forEach((newWorkflow) => {
            classifyPart(range, newWorkflow.something);
        });
    }

    function testWorkflow(workflowTag) {
        let nextWorkflows = [];
        const workflow = map.get(workflowTag);

        for (let i = 0; i < workflow.length; i++) {
            const test = workflow[i];
            const [conditionRaw, possibleNextWorkflow] = test.split(":");
            if (possibleNextWorkflow === undefined) {
                // im in the last
                // { x: 1, m: 1, a: 1, s: 1 }
            }
            const condition = conditionRaw.split(/[<,>]/);
            const conditionKey = condition[0];
            const conditionValue = condition[1];
            nextWorkflows.push({
                range: { ...basic, conditionKey: conditionValue },
                workflow: possibleNextWorkflow,
            });
        }

        console.log(workflowTag, workflow);

        return [];
    }
});
