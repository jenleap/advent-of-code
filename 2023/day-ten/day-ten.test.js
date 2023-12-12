const calculateFarthestSteps = require("./problem-one");

describe('2023 day ten', () => {
    it('should return 4 for problem 1', () => {
        const solution = 4; 
        calculateFarthestSteps('./2023/day-ten/test-input.txt')
            .then((result => {
                expect(result).toBe(solution);
            }));
    });

    it('should return 8 for problem 1 input two', () => {
        const solution = 8; 
        calculateFarthestSteps('./2023/day-ten/test-input-two.txt')
            .then((result => {
                expect(result).toBe(solution);
            }));
    });
});