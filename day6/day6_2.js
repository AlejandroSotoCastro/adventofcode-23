const fs = require("fs");

// const input = "./day6/testInput.txt";
const input = "./day6/input.txt";

fs.readFile(input, "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const acceleration = 1; // mm/ms
    const [rawTime, rawDistance] = data.split(/\r?\n/);
    const time = Number(rawTime.split(": ")[1].trim().replace(/\s+/g, ""));
    const distance = Number(rawDistance.split(": ")[1].trim().replace(/\s+/g, ""));
    //remove spaces from the string

    // each race has a distance and a time Example: {distance: 1000, time: 10}
    const race = { distance, time };
    console.log(time);

    console.log(calculateRace(race));

    // multiply all possible ways together
    // const totalWays = allPossibleWays.reduce((a, b) => a * b);
    // console.log(totalWays);

    function calculateRace(race) {
        let possibleWays = 0;
        for (let pushTime = 1; pushTime < race.time; pushTime++) {
            const speed = acceleration * pushTime;
            const travelTime = race.time - pushTime;
            const distance = speed * travelTime;
            if (distance > race.distance) {
                possibleWays++;
            }
        }
        return possibleWays;
    }
});
