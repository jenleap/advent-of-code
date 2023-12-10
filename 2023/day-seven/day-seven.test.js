const calculateTotalWinnings = require("./problem-one");
const calculateTotalWinningsWithJoker = require("./problem-two");

describe('2023 day seven', () => {
    it('should return 6440 for day 7 problem 1', () => {
        const solution = 6440; 
        calculateTotalWinnings('./2023/day-seven/test-input.txt')
            .then((result => {
                expect(result).toBe(solution);
            }));
    });

    it('should return 5905 for day 7 problem 2', () => {
        const solution = 5905; 
        calculateTotalWinningsWithJoker('./2023/day-seven/test-input.txt')
            .then((result => {
                expect(result).toBe(solution);
            }));
    });
});