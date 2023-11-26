const basicFileHelper = require("../../utils/basic-file-helper");

const calculateBasement = (input) => {
    let startingFloor = 0;
    let firstBasement = null;

    const splitData = input.split('');

    splitData.forEach((move, index) => {
        if (move === "(") {
            startingFloor++;
        } else {
            startingFloor--;
        }

        if (parseInt(startingFloor) < 0 && firstBasement === null) {
            firstBasement = index + 1;
        } 
    });

    return firstBasement;
}

basicFileHelper('./2015/day-one/input.txt', calculateBasement).then(basementPosition => {
    console.log(basementPosition);
});

module.exports = calculateBasement;