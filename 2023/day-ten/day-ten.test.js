const { calculateFarthestSteps } = require("./problem-one");
const countInnerTiles = require("./problem-two");

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

   /*  it('should return 4 for problem 2 input three', () => {
        const solution = 4; 
        calculateInnerTiles('./2023/day-ten/test-input-three.txt')
            .then((result => {
                expect(result).toBe(solution);
            }));
    });

    it('should return 8 for problem 2 input four', () => {
        const solution = 8; 
        calculateInnerTiles('./2023/day-ten/test-input-four.txt')
            .then((result => {
                expect(result).toBe(solution);
            }));
    }); */
});