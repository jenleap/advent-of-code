const fileParser = require("../../utils/file-parser");
const { Hands } = require("./constants");

const Cards = {
    A: 13,
    K: 12,
    Q: 11,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
    J: 1
};

const checkKind = (cards, kind) => {
    return Object.values((cards)).filter(numCards => numCards === kind).length > 0;
}

const getHandType = (hand) => {
    const cardMap = {};
    let hasJoker = false;
    for (const card of hand) {
        if (card === "J") {
            hasJoker = true;
        }
        if (cardMap[card] === undefined) {
            cardMap[card] = 1;
        } else {
            cardMap[card] = cardMap[card] + 1;
        }
    }
    const cardTypes = Object.keys(cardMap);

    switch(cardTypes.length) {
        case 1:
            return Hands.FiveOfAKind;
        case 2:
            if (hasJoker) {
                return Hands.FiveOfAKind;
            } else if (checkKind(cardMap, 4)) {
                return Hands.FourOfAKind;
            } else {
                return Hands.FullHouse;
            }
        case 3:
            if (checkKind(cardMap, 3)) {
                return hasJoker ? Hands.FourOfAKind : Hands.ThreeOfAKind;
            } else {
                if (hasJoker) {
                    const numJokers = cardMap["J"];
                    return (numJokers === 1) ? Hands.FullHouse : Hands.FourOfAKind;
                } else {
                    return Hands.TwoPair;
                } 
            }
        case 4:
            return hasJoker ? Hands.ThreeOfAKind : Hands.OnePair;
        default:
            return hasJoker ? Hands.OnePair : Hands.HighCard;
    }
}

const formatHands = (allHands) => {
    return allHands.split("\n").map(row => row.split(" ")).map(r => {
        return {
            cards: r[0],
            bid: parseInt(r[1])
        }
    });
}

const getRankedHands = (hands) => {
    const groupedHands = hands.reduce((acc, hand) => {
        if (acc[hand.type] === undefined) {
            acc[hand.type] = [hand];
        } else {
            acc[hand.type].push(hand);
        }
        return acc;
    }, {});
    const orderedHands = Object.values(groupedHands).map(group => {
        return orderHandTypes(group);
    });
    return orderedHands;
}

const orderHandTypes = (type) => {
    return type.sort((a, b) => {
        const handA = a.cards;
        const handB = b.cards;
        let index = 0;
        while (index < 5) {
            if (handA[index] !== handB[index]) {
                return Cards[handA[index]] - Cards[handB[index]];
            }
            index++;
        }
    })
}


const calculateTotalWinningsWithJoker = (input) => {
    return fileParser(input).then((data) => {
        const allHands = formatHands(data);
        const handsWithType = allHands.map(hand => {
            return {
                ...hand,
                type: getHandType(hand.cards)
            }
        });
        const rankedHands = getRankedHands(handsWithType);
        return rankedHands.flat().reduce((acc, hand, index) => {
            return acc + (hand.bid * (index + 1));
        }, 0);
    })
}

calculateTotalWinningsWithJoker('./2023/day-seven/input.txt').then(result => console.log(result));

module.exports = calculateTotalWinningsWithJoker;