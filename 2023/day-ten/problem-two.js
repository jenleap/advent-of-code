const fileParser = require("../../utils/file-parser");


const pipeMap = {
    "|": [[1, 0], [-1, 0]],
    "-": [[0, 1], [0, -1]],
    "L": [[-1, 0], [0, 1]],
    "J": [[-1, 0], [0, -1]],
    "7": [[1, 0], [0, -1]],
    "F": [[1, 0], [0, 1]],
    ".": [],
    "S": [[1, 0], [-1, 0], [0, 1], [0, -1]]
};

const getPipeByNbs = (nbs) => {
    return Object.entries(pipeMap).map(([key, value]) => {
        if (value.length !== 2) {
            if (nbs.length === value.length) {
                return key;
            }  
        } else {
            const value1 = value[0].toString();
            const value2 = value[1].toString();
            const nb1 = nbs[0].toString();
            const nb2 = nbs[1].toString();
            if ((value1 === nb1 || value1 === nb2) && (value2 === nb1 || value2 === nb2)) {
                return key;
            }
        }
    }).filter(pipe => pipe);
}

const getNbs = (pipe) => {
    switch(pipe) {
        case "|": 
            return [[1, 0], [-1, 0]];
        case "-": 
            return [[0, 1], [0, -1]];
        case "L": 
            return [[-1, 0], [0, 1]];
        case "J": 
            return [[-1, 0], [0, -1]];
        case "7": 
            return [[1, 0], [0, -1]];
        case "F": 
            return [[1, 0], [0, 1]];
        case "S": 
            return [[1, 0], [-1, 0], [0, 1], [0, -1]];
        default:
            return [];
    }
}

const createNbMap = (loopSketch) => {
    const nbMap = new Map();
    for (let i = 0; i < loopSketch.length; i++) {
        for (let j = 0; j < loopSketch[i].length; j++) {
            const currentTile = loopSketch[i][j];
            const nbs = getNbs(currentTile);
            const linkedTiles = [];
            for (const nb of nbs) {
                const x = i + nb[0];
                const y = j + nb[1];
                if (x >= 0 && x < loopSketch.length && j >= 0 && j < loopSketch[i].length) {
                    linkedTiles.push([x, y]);
                }
            }
            if (linkedTiles.length > 0) {
                nbMap.set([i, j].toString(), linkedTiles);
            }
        }
    }
    return nbMap;
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

const getTileType = (position, loopSketch) => {
    const nbsPos = getNbs("S");
    const actualNbs = [];

    for (const nb of nbsPos) {
        const x = position[0] + nb[0];
        const y = position[1] + nb[1];
        const tile = loopSketch[x][y];
        const tileNbs = getNbs(tile);
        for (const n of tileNbs) {
            const nx = x + n[0];
            const ny = y + n[1];
            if (nx === position[0] && nx > 0 && ny === position[1] && ny > 0) {
                actualNbs.push(n);
            }
        }
    }
    return getPipeByNbs(actualNbs)[0];
}

const hasRemainingPipes = (pipe, subRow) => {
    return subRow.includes("|") || subRow.includes("7") || subRow.includes("F");
}

const getInnerTiles = (sketch) => {
    return sketch.map(row => row.filter(tile => tile === "I")).flat().length;
}

const formatLoopSketch = (data) => {
    return data.split("\n").map(row => row.split(""));
}

const countInnerTiles = (input) => {
    return fileParser(input).then((data) => {
        const loopSketch = formatLoopSketch(data);
        const animalPosition = getAnimalPosition(loopSketch);
        const tileType = getTileType(animalPosition, loopSketch);
        loopSketch[animalPosition[0]][animalPosition[1]] = tileType;
        const nbMap = createNbMap(loopSketch);
        const tileSketch = [...Array(loopSketch.length)].map(row => Array(loopSketch[0].length).fill("O"));
        const visited = new Set();
        const paths = [animalPosition];

        while (paths.length > 0) {
            const tile = paths.shift();
            const tileLabel = tile.toString();
            if (!visited.has(tileLabel)) {
                visited.add(tileLabel);
                tileSketch[tile[0]][tile[1]] = loopSketch[tile[0]][tile[1]];
                const nbTiles = nbMap.get(tileLabel);
                if (nbTiles) {
                    for (const nb of nbTiles) {
                        paths.push(nb);
                    }
                } 
            }
        }

        for (let i = 0; i < tileSketch.length; i++) {
            let insideLoop = false;
            for (let j = 0; j < tileSketch[i].length; j++) {
                const currentTile = tileSketch[i][j];
                if (currentTile === "|" || currentTile === "7" || currentTile === "F") {
                    insideLoop = !insideLoop;
                } else {
                    if (currentTile === "O" && insideLoop && hasRemainingPipes("|", tileSketch[i].slice(j, tileSketch[i].length))) {
                        tileSketch[i][j] = "I";
                    }
                }
            }
        }
        return getInnerTiles(tileSketch);
    });
}

countInnerTiles('./2023/day-ten/input.txt').then(result => console.log(result));

module.exports = countInnerTiles;