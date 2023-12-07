const fileParser = require("../../utils/file-parser");
const { Hands, Cards } = require("./constants");


const checkKind = (cards, kind) => {
    return Object.values((cards)).filter(numCards => numCards === kind).length > 0;
}

const getHandType = (hand) => {
    const cardMap = {};
    for (const card of hand) {
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
            if (checkKind(cardMap, 4)) {
                return Hands.FourOfAKind;
            } else {
                return Hands.FullHouse;
            }
        case 3:
            if (checkKind(cardMap, 3)) {
                return Hands.ThreeOfAKind;
            } else {
                return Hands.TwoPair;
            }
        case 4:
            return Hands.OnePair;
        default:
            return Hands.HighCard;
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
    })
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


const calculateTotalWinnings = (input) => {
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

calculateTotalWinnings('./2023/day-seven/input.txt').then(result => console.log(result));

module.exports = calculateTotalWinnings;