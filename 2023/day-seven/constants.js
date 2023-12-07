//A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, or 2

const Hands = {
    FiveOfAKind: 7,
    FourOfAKind: 6,
    FullHouse: 5,
    ThreeOfAKind: 4,
    TwoPair: 3,
    OnePair: 2,
    HighCard: 1
};

const Cards = {
    A: 13,
    K: 12,
    Q: 11,
    J: 10,
    T: 9,
    9: 8,
    8: 7,
    7: 6,
    6: 5,
    5: 4,
    4: 3,
    3: 2,
    2: 1
};

module.exports = { Hands, Cards };