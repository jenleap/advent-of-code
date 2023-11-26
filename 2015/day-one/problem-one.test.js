const calculateFloor = require("./problem-one");

it('should result in floor 0 when given (()) or ()()', () => {
    const solution = 0;
    const inputOne = "(())";
    const inputTwo = "()()";
    const resultOne = calculateFloor(inputOne);
    const resultTwo = calculateFloor(inputTwo);
    expect(resultOne).toBe(solution);
    expect(resultTwo).toBe(solution);
});

it('should result in floor 3 when given ((( or (()(()( or ))(((((', () => {
    const solution = 3;
    const inputOne = '(((';
    const inputTwo = '(()(()(';
    const inputThree = '))(((((';
    const resultOne = calculateFloor(inputOne);
    const resultTwo = calculateFloor(inputTwo);
    const resultThree = calculateFloor(inputThree);
    expect(resultOne).toBe(solution);
    expect(resultTwo).toBe(solution);
    expect(resultThree).toBe(solution);
});

it('should result in floor -3 when given ))) or )())())', () => {
    const solution = -3;
    const inputOne = ')))';
    const inputTwo = ')())())';
    const resultOne = calculateFloor(inputOne);
    const resultTwo = calculateFloor(inputTwo);
    expect(resultOne).toBe(solution);
    expect(resultTwo).toBe(solution);
})