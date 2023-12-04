const calculateScratchTicketWorth = require('./problem-one');

describe('2023 day one', () => {
    it('should be worth 13pts', () => {
        const solution = 13;
        const result = calculateScratchTicketWorth('./2023/day-four/test-input.txt');
        expect(result).toBe(solution);
    });
});