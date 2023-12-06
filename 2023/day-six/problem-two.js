const fileParser = require("../../utils/file-parser");

const getRaceDetails = (data) => {
    const splitData = data.split('\n');
    const rows = splitData.map(row => {
        return row.split(' ').filter(cell => cell.length > 0);
    });
    const trimmedRows = rows.map(row => {
        row.shift()
        return row;
    });
    return trimmedRows.map(row => parseInt(row.join('')));
}

const getHoldOptions = (race) => {
    const holdOptions = [];
    for (let i = 0; i < race[0]; i++) {
        const distanceTravelled = i * (race[0] - i);
        if (distanceTravelled > race[1]) {
            holdOptions.push(i);
        }
    }
    return holdOptions;
}

const beatSingleRaceRecord = (input) => {
    return fileParser(input).then((data) => {
        const raceDetails = getRaceDetails(data);
        const result = getHoldOptions(raceDetails);
        return result.length;
    })
};

beatSingleRaceRecord('./2023/day-six/input.txt').then(result => console.log(result));

module.exports = beatSingleRaceRecord;