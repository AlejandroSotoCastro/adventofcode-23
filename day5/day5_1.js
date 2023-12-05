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

    const result = seeds.map((seed) => {
        return recursiveMap(seed, 0);
    });
    // console.log(result);

    const min = Math.min(...result);
    console.log("Min: ", min);
    console.timeEnd("timer");
    // const test = recursiveMap(14, 0);
    // console.log(test);

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
