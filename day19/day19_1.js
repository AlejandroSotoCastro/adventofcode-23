const fs = require("fs");

// const input = "./day19/testInput.txt";
const input = "./day19/input.txt";

const init = "in";
fs.readFile(input, "utf8", (_err, data) => {
    //split empty line
    const [workflows, rawRatings] = data.split(/\n\s*\n/).map((line) => line.split(/\r?\n/));
    const map = mapWorkflows(workflows);
    const ratings = rawRatings.map((rating) => {
        return rating
            .substring(1, rating.length - 1)
            .split(",")
            .reduce((acc, curr) => {
                const [key, value] = curr.split("=");
                acc[key] = value;
                return acc;
            }, {});
    });
    // console.log(ratings);

    // for each rating
    const parts = [];
    for (let i = 0; i < ratings.length; i++) {
        const rating = ratings[i];

        parts.push(classifyPart(rating, init));
    }
    const count = measureAccepted(parts);
    console.log(count);

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

    function classifyPart(rating, workflow) {
        if (!map.has(workflow)) return { workflow, rating };
        const newWorkflow = testWorkflow(rating, workflow);
        return classifyPart(rating, newWorkflow);
    }

    function testWorkflow(rating, workflowTag) {
        //  'px' => [ 'a<2006:qkq', 'm>2090:A', 'rfg' ],
        // for each test in workflow
        // split by : and save to nextWorkflow and conditionRaw
        // replace the fisrt letter of conditionRaw with rating[conditionRaw[0]] and evaluate the condition
        // if true break the loop and return nextWorkflow

        let nextWorkflow;
        const workflow = map.get(workflowTag);
        for (let i = 0; i < workflow.length; i++) {
            const test = workflow[i];
            const [conditionRaw, possibleNextWorkflow] = test.split(":");
            if (possibleNextWorkflow === undefined) {
                nextWorkflow = conditionRaw;
                break;
            }
            const condition = conditionRaw.replace(conditionRaw[0], rating[conditionRaw[0]]);
            if (eval(condition)) {
                nextWorkflow = possibleNextWorkflow;
                break;
            }
        }
        if (nextWorkflow === undefined) console.error("ERROR: no workflow found");
        return nextWorkflow;
    }

    function measureAccepted(parts) {
        let counter = 0;
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (part.workflow === "A") {
                counter += Object.keys(part.rating).reduce((acc, curr) => {
                    return acc + parseInt(part.rating[curr]);
                }, 0);
            }
        }
        return counter;
    }
});
