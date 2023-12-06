const beatRaceRecord = require("./problem-one");
const beatSingleRaceRecord = require("./problem-two");

describe('2023 day six', () => {
    it('should return 288', () => {
        const solution = 288; 
        beatRaceRecord('./2023/day-six/test-input.txt')
            .then((result => {
                expect(result).toBe(solution);
            }));
    });

    it('should return 71503', () => {
        const solution = 71503; 
        beatSingleRaceRecord('./2023/day-six/test-input.txt')
            .then((result => {
                expect(result).toBe(solution);
            }));
    });
});