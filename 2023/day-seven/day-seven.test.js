const calculateTotalWinnings = require("./problem-one");


describe('2023 day seven', () => {
    it('should return 6440 for problem one', () => {
        const solution = 6440; 
        calculateTotalWinnings('./2023/day-seven/test-input.txt')
            .then((result => {
                expect(result).toBe(solution);
            }));
    });
});