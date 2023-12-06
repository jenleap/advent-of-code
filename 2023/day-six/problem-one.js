const fileParser = require("../../utils/file-parser");

const getRaceDetails = (data) => {
    const splitData = data.split('\n');
    const rows = splitData.map(row => {
        return row.split(' ').filter(cell => cell.length > 0);
    });
    console.log(rows);
    const raceDetails = {};
    for (let i = 1; i < rows[0].length; i++) {
        raceDetails[i] = {
            time: rows[0][i],
            distance: rows[1][i]
        }
    }
    return raceDetails;
}

const getHoldOptions = (race) => {
    const holdOptions = [];
    for (let i = 0; i < race.time; i++) {
        const distanceTravelled = i * (race.time - i);
        if (distanceTravelled > race.distance) {
            holdOptions.push(i);
        }
    }
    return holdOptions;
}

const beatRaceRecord = (input) => {
    return fileParser(input).then((data) => {
        const raceDetails = getRaceDetails(data);
        const result = Object.values(raceDetails).map(race => getHoldOptions(race));
        return result.reduce((acc, race) => {
            return acc * race.length;
        }, 1);
    })
};

beatRaceRecord('./2023/day-six/input.txt').then(result => console.log(result));

module.exports = beatRaceRecord;