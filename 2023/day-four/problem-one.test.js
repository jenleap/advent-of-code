const calculateScratchTicketWorth = require('./problem-one');

describe('2023 day one', () => {
    it('should be worth 13pts', () => {
        const solution = 13; 
        calculateScratchTicketWorth('./2023/day-four/test-input.txt')
            .then((result => {
                expect(result).toBe(solution);
            }));
    });
});