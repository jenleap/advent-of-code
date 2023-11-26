const calculateBasement = require("./problem-two");

it('should result in position 1 when given )', () => {
    const solution = 1;
    const inputOne = ")())";
    const resultOne = calculateBasement(inputOne);
    expect(resultOne).toBe(solution);
});

it('should result in position 5 when given ()())', () => {
    const solution = 5;
    const inputOne = '()())))((';
    const resultOne = calculateBasement(inputOne);
    expect(resultOne).toBe(solution);
})