const basicFileHelper = require("../../utils/basic-file-helper");

const calculateFloor = (input) => {
    let startingFloor = 0;

    const splitData = input.split('');

    splitData.forEach((move) => {
        if (move === "(") {
            startingFloor++;
        } else {
            startingFloor--;
        }
    });

    return startingFloor;
}

basicFileHelper('./2015/day-one/input.txt', calculateFloor).then(endingFloor => {
    console.log(endingFloor);
});

module.exports = calculateFloor;