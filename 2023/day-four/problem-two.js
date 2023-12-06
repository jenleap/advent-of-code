const fileParser = require("../../utils/file-parser");

const formartScratchCard = (cardPile) => {
    const cards = cardPile.split('\n');
    return cards.reduce((acc, card, index) => {
        const splitCard = card.replace(':', '|').split('|');
        acc[index + 1] = {
            wins: formatNumbers(splitCard[1]),
            nums: formatNumbers(splitCard[2]),
            count: 1
        };
        return acc;
    }, {});
}

const formatNumbers = (nums) => {
    return nums.trim().split(" ").map(num => parseInt(num)).filter(n => !isNaN(n));
}

const getNumberOfWins = (card) => {
    return card.nums.reduce((acc, num) => {
        if (card.wins.includes(num)) {
           return acc + 1;
        } else {
            return acc;
        }
    }, 0);
}

const checkCards = (cards) => {
    for (const [cardNum, currentCard] of Object.entries(cards)) {
        const numberWins = getNumberOfWins(currentCard);
        const cardCopies = getCardCopies(numberWins, cardNum);
        for (const num of cardCopies) {
            const cardCopy = cards[num];
            cardCopy.count = cardCopy.count + currentCard.count;
        }
    }

    return Object.values(cards).reduce((acc, card) => {
        return acc + card.count
    }, 0);
}

const getCardCopies = (numberWins, cardNum) => {
    const cardCopies = [];
    for (let i = 1; i <= numberWins; i++) {
        cardCopies.push(parseInt(cardNum) + i);
    }
    return cardCopies;
}

const countScratchCards = (input) => {
    return fileParser(input).then((data) => {
        const cards = formartScratchCard(data);
        return checkCards(cards);
    })
}

countScratchCards('./2023/day-four/input.txt').then(result => console.log(result));

module.exports = countScratchCards;