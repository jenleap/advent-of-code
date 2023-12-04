const fileParser = require("../../utils/file-parser");

const formartScratchCard = (cardPile) => {
    const cards = cardPile.split('\n');
    return cards.map(card => {
        const splitCard = card.replace(':', '|').split('|');
        return {
            wins: formatNumbers(splitCard[1]),
            nums: formatNumbers(splitCard[2])
        }
    });
}

const formatNumbers = (nums) => {
    return nums.trim().split(" ").map(num => parseInt(num)).filter(n => !isNaN(n));
}

const checkWins = (card) => {
    return card.nums.reduce((acc, num) => {
        if (card.wins.includes(num)) {
            if (acc > 0) {
                return acc * 2;
            } else {
                return 1;
            }
        } else {
            return acc;
        }
    }, 0);
}


const calculateScratchTicketWorth = (input) => {
    fileParser(input).then((data) => {
        const cards = formartScratchCard(data);
        const cardWorth = cards.map(card => checkWins(card));
        const cardsTotal = cardWorth.reduce((acc, cardTotal) => {
            return acc + cardTotal;
        }, 0);
        console.log(cardsTotal);
        return cardsTotal;
    })
}

console.log(calculateScratchTicketWorth('./2023/day-four/input.txt'));

module.exports = calculateScratchTicketWorth;