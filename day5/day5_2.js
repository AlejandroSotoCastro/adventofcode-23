const fs = require("fs");

// const input = "./day5/testInput.txt";
const input = "./day5/input.txt";
// start timer
console.time("timer");

fs.readFile(input, "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

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
    const totalArr = [];

    for (let i = 0; i < seedPairs.length; i++) {
        console.log("Seed: ", i);
        console.time("seedTimer");
        const seedPair = seedPairs[i];
        const minSeed = seedPair[0];
        const maxSeed = seedPair[0] + seedPair[1];
        let minResult = 1e14;
        for (let j = minSeed; j < maxSeed; j++) {
            const result = recursiveMap(j, 0);
            if (result < minResult) {
                minResult = result;
            }
        }
        console.log("Min: ", minResult);
        totalArr.push(minResult);
        console.timeEnd("seedTimer");
    }
    console.log("Min: ", Math.min(...totalArr));
    console.timeEnd("timer");

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
            if (value >= row.source && value <= maxRange) {
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
});

// const solution = [
//     47909640, 87324761, 145492042, 93839243, 141917941, 2125541364, 704786709, 229878818, 622612797,
// ];
