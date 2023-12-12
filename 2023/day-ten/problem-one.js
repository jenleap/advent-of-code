const fileParser = require("../../utils/file-parser");

const Direction = {
    south: "south",
    north: "north",
    west: "west",
    east: "east"
}

const getPipeDirection = (pipe, direction) => {
    switch(pipe) {
        case "|":
            if (direction === Direction.south) {
                return Direction.south ;
            } else if (direction === Direction.north) {
                return Direction.north;
            } else {
                return;
            }
        case "-":
            if (direction === Direction.east) {
                return Direction.east;
            } else if (direction === Direction.west) {
                return Direction.west;
            } else {
                return;
            }
        case "L":
            if (direction === Direction.south) {
                return Direction.west;
            } else if (direction === Direction.east) {
                return Direction.north;
            } else {
                return;
            }
        case "J":
            if (direction === Direction.south) {
                return Direction.east;
            } else if (direction === Direction.west) {
                return Direction.north;
            } else {
                return;
            }
        case "7":
            if (direction === Direction.west) {
                return Direction.south;
            } else if (direction === Direction.north) {
                return Direction.east;
            } else {
                return;
            }
        case "F":
            if (direction === Direction.east) {
                return Direction.south;
            } else if (direction === Direction.north) {
                return Direction.west;
            } else {
                return;
            }
        case "S":
            return;
        case ".":
            return 'ground';  
    }
}

const move = (startingPosition, direction, loopSketch) => {
    switch(direction) {
        case Direction.south:
            if (startingPosition[0] + 1 > loopSketch.length) {
                return;
            } else {
                return [startingPosition[0] + 1, startingPosition[1]]
            }
        case Direction.north:
            if (startingPosition[0] - 1 < 0) {
                return;
            } else {
                return [startingPosition[0] - 1, startingPosition[1]]
            }
        case Direction.east:
            if (startingPosition[1] - 1 < 0) {
                return;
            } else {
                return [startingPosition[0], startingPosition[1] - 1]
            }
        case Direction.west:
            if (startingPosition[1] + 1 > loopSketch[0].length) {
                return;
            } else {
                return [startingPosition[0], startingPosition[1] + 1]
            }
    }
}

const getAnimalPosition = (loopSketch) => {
    for (let i = 0; i < loopSketch.length; i++) {
        for (let j = 0; j < loopSketch[i].length; j++) {
            if (loopSketch[i][j] === "S") {
                return [i, j];
            }
        }
    }
}

const getPossiblePaths = (position, loopSketch) => {
    return Object.keys(Direction).map(dir => {
        const newPosition = move(position, dir, loopSketch);
        if (newPosition) {
            return {
                position: newPosition,
                direction: dir
            };
        }
    // Remove undefined values
    }).filter(pos => pos);
}

const formatLoopSketch = (data) => {
    return data.split("\n").map(row => row.split(""));
}

const hasMoreTiles = (stepSketch) => {
    console.log(stepSketch);
    return stepSketch.map(row => row.includes('X') || row.includes('.')).filter(bool => bool).length > 0;
}

const createStepSketch = (loopSketch) => {
    const stepSketch = [...Array(loopSketch.length)].map(row => Array(loopSketch[0].length).fill("X"));
    for (let i = 0; i < loopSketch.length; i++) {
        for (let j = 0; j < loopSketch[0].length; j++) {
            if (loopSketch[i][j] === ".") {
                stepSketch[i][j] = ".";
            }
        }
    }
    return stepSketch;
}

const getMaxSteps = (stepSketch) => {
    return Math.max(...stepSketch.map(row => Math.max(...row.filter(tile => Number.isInteger(tile)))));
}

const calculateFarthestSteps = (input) => {
    return fileParser(input).then((data) => {
        const loopSketch = formatLoopSketch(data);
        // Create empty sketch of steps along looop
        const stepSketch = createStepSketch(loopSketch);
        const animalPosition = getAnimalPosition(loopSketch);
        let stepNum = 1;
        let paths = getPossiblePaths(animalPosition, loopSketch);
        stepSketch[animalPosition[0]][animalPosition[1]] = 0;

        while (paths.length > 0) {
            const newPaths = [];
            paths.forEach(step => {
                const currentPipe = loopSketch[step.position[0]][step.position[1]];
                const currentTile = stepSketch[step.position[0]][step.position[1]];
                if (currentTile === "X") {
                    stepSketch[step.position[0]][step.position[1]] = stepNum;
                } 
                const directionToMove = getPipeDirection(currentPipe, step.direction);
                if (directionToMove && directionToMove !== "ground") {
                    const newPosition = move(step.position, directionToMove, loopSketch);
                    if (newPosition) {
                        newPaths.push({
                            position: newPosition,
                            direction: directionToMove
                        });
                    }
                }
            });
            paths = newPaths;
            stepNum++;

        }
        return getMaxSteps(stepSketch);
    });
}

calculateFarthestSteps('./2023/day-ten/input.txt').then(result => console.log(result));

module.exports = calculateFarthestSteps;