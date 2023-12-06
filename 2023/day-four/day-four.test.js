const calculateScratchTicketWorth = require('./problem-one');
const countScratchCards = require('./problem-two');

describe('2023 day four', () => {
    it('should be worth 13pts', () => {
        const solution = 13; 
        calculateScratchTicketWorth('./2023/day-four/test-input.txt')
            .then((result => {
                expect(result).toBe(solution);
            }));
    });

    it('should have 30 total cards', () => {
        const solution = 30;
        countScratchCards('./2023/day-four/test-input.txt')
            .then(result => {
                expect(result).toBe(solution);
            });
    });
});