const fs = require("fs");

const input = "./day12/testInput.txt";
// const input = "./day12/input.txt";
// start timer
console.time("timer");
counts = [];
fs.readFile(input, "utf8", (_err, data) => {
    data.split(/\r?\n/).forEach((row) => {
        if (row === "") return;

        counts.push(calculateCounts(row));
    });

    function calculateCounts(row) {
        const [springsRaw, checksRaw] = row.split(" ");
        const checks = checksRaw.split(",").map((c) => Number(c));
        const springs = springsRaw.split("");
        console.log(iterativeCheck(springs, checks));
    }

    function iterativeCheck(springs, checks) {
        let queue = [{ springs: [...springs], checks: [...checks] }];
        let result = 0;

        while (queue.length > 0) {
            let { springs, checks } = queue.shift();
            let char = springs.shift();

            if (char === ".") {
                queue.push({ springs, checks });
            } else if (char === "?") {
                let copy1 = [...springs];
                copy1.unshift(".");
                queue.push({ springs: copy1, checks });

                let copy2 = [...springs];
                copy2.unshift("#");
                queue.push({ springs: copy2, checks });
            } else if (char === "#") {
                let copy = [...springs];
                copy.unshift("#");
                let size = checks[0];
                let check = copy.slice(0, size);

                if (copy.length === 0 && checks.length === 0) {
                    result += 1;
                } else if (size <= copy.length && check.every((c) => c !== ".")) {
                    copy.splice(0, size);
                    checks.shift();
                    queue.push({ springs: copy, checks });
                } else {
                    console.error("unknown rule");
                }
            } else {
                console.error("unknown symbol" + char);
            }
        }

        return result;
    }
});
