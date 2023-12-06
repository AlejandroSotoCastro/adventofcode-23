const fs = require("fs");
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");

// const input = "./day5/testInput.txt";
const input = "./day5/input.txt";
// start timer
console.time("timer");

fs.readFile(input, "utf8", (_err, data) => {
    const blocks = data.split(/\n\s*\n/);
    // Remove empty strings and trim each block
    const trimmedBlocks = blocks.filter(Boolean).map((block) => block.trim());

    // Now you can assign each block to a variable
    const seeds = trimmedBlocks[0].split(": ")[1].split(" ").map(Number);
    const seedPairs = [];
    for (let i = 0; i < seeds.length; i += 2) {
        seedPairs.push([seeds[i], seeds[i + 1]]);
    }
    const seedToSoil = trimmedBlocks[1].split(":\r\n")[1];
    const soilToFertilizer = trimmedBlocks[2].split(":\r\n")[1];
    const fertilizerToWater = trimmedBlocks[3].split(":\r\n")[1];
    const waterToLight = trimmedBlocks[4].split(":\r\n")[1];
    const lightToTemperature = trimmedBlocks[5].split(":\r\n")[1];
    const temperatureToHumidity = trimmedBlocks[6].split(":\r\n")[1];
    const humidityToLocation = trimmedBlocks[7].split(":\r\n")[1];

    const unformattedMapList = [
        seedToSoil,
        soilToFertilizer,
        fertilizerToWater,
        waterToLight,
        lightToTemperature,
        temperatureToHumidity,
        humidityToLocation,
    ];

    const formattedMapList = unformattedMapList.map(formatMap);

    if (isMainThread) {
        console.time("main");
        const superBucket = seedPairs.map((seedPair) => {
            return { first: seedPair[0], last: seedPair[0] + seedPair[1] };
        });

        const promises = superBucket.map((seedPair) => {
            return new Promise((resolve, reject) => {
                const worker = new Worker(__filename, { workerData: seedPair });
                worker.on("message", resolve);
                worker.on("error", reject);
                worker.on("exit", (code) => {
                    if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
                });
            });
        });
        console.log("All processes running");
        Promise.all(promises)
            .then((results) => {
                // Handle results
                console.log("results: ", results);
                console.log("Total min: ", Math.min(...results));
                console.timeEnd("main");
            })
            .catch((err) => {
                console.error(err);
            });
    } else {
        // Worker thread
        const seedPair = workerData;
        console.time("worker");
        console.log("seedPair: ", seedPair);
        let localMin = undefined;
        for (let i = seedPair.first; i < seedPair.last; i++) {
            const seedMin = recursiveMap(i, 0);
            localMin = min(localMin, seedMin);
        }
        console.log("localMin: ", localMin);
        parentPort.postMessage(localMin);
        console.timeEnd("worker");
    }

    function recursiveMap(value, index) {
        if (index === 7) {
            return value;
        }
        // console.log("Im in map: ", index);
        const currentMap = formattedMapList[index];
        let newValue = value;
        for (let i = 0; i < currentMap.length; i++) {
            const row = currentMap[i];
            const maxRange = row.source + row.length;
            // console.log("maxRange: ", maxRange);
            if (value >= row.source && value < maxRange) {
                const diff = row.destination - row.source;
                // if (diff < 0) console.log("ERROR: diff is negative");
                newValue = value + diff;
                // console.log("There was a map: ", newValue);
                break;
            }
        }

        // console.log("Default map: ", value);
        return recursiveMap(newValue, index + 1);
    }

    function formatMap(unformattedMap) {
        const formattedMap = unformattedMap.split("\r\n").map((row) => {
            const [destination, source, length] = row.split(" ");
            return { destination: Number(destination), source: Number(source), length: Number(length) };
        });
        return formattedMap;
    }

    function min(currentMin, value) {
        if (currentMin === undefined) return value;
        return value < currentMin ? value : currentMin;
    }
});
