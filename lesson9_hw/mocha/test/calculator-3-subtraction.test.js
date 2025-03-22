const Calculator = require('../../calculator.js');
const expect = require('chai').expect;

const calculator = new Calculator();

const positiveTestCasesForSubtraction = [
    {args: [1, 2], expected: -1},
    {args: [2, 1], expected: 1},
    {args: [0, 1], expected: -1},
    {args: [1, 0], expected: 1},
    {args: [5, 5], expected: 0},
    {args: [-5, -5], expected: 0},
    {args: [5, -5], expected: 10},
    {args: [-5, 5], expected: -10},
    {args: [1000000000000000, 6000000000000000], expected: -5000000000000000},
    {args: [2.9, 1.5], expected: 1.4},
];

describe('Positive cases for Calculator\'s method \"Subtraction\":', () => {
    positiveTestCasesForSubtraction.forEach(testCase => {
        it(`subtraction should be done correctly: ${testCase.args} = ${testCase.expected}`, () => {
            const result = calculator.subtraction(...testCase.args);
            expect(result).to.deep.equal(testCase.expected);    
        });
    });
    
});

const NegativeTestCasesForSubtraction = [
    {args: [Number.MAX_SAFE_INTEGER, 1], expected: 9007199254740990},
    {args: [Number.MIN_SAFE_INTEGER, 1], expected: -9007199254740992},
    {args: [-Infinity, 1], expected: -Infinity},  
    {args: [1, Infinity], expected: -Infinity}
];

const invalidTypesForSubtraction = [
    {args: [true, true], expected: 0},
    {args: [false, false], expected: 0},
    {args: [null, null], expected: 0},
    {args: [undefined, undefined], expected: NaN},
    {args: [NaN, NaN], expected: NaN},
    {args: ['10', 1], expected: 9},
    {args: [10, '1'], expected: 9},
    {args: ['10', '1'], expected: 9}
];

describe('Negative cases for Calculator\'s method \"Subtraction\":', () => {
    invalidTypesForSubtraction.forEach(testCase => {
        it(`should return ${testCase.expected} for elements ${testCase.args} of invalid type`, () => {
            const result = calculator.subtraction(...testCase.args);
            expect(result).to.deep.equal(testCase.expected);    
        });
    });
    NegativeTestCasesForSubtraction.forEach(testCase => {
        it(`subtraction should be done correctly: ${testCase.args} = ${testCase.expected}`, () => {
            const result = calculator.subtraction(...testCase.args);
            expect(result).to.deep.equal(testCase.expected);    
        });
    });
    it('should return NaN for missing arguments', () => {
        const result = calculator.subtraction();
        expect(result).to.deep.equal(NaN);
    });
    it('should return NaN for one missing argument', () => {
        const result = calculator.subtraction(1);
        expect(result).to.deep.equal(NaN);
    });
    it('should return result for first two elements if too many arguments', () => {
        const result = calculator.subtraction(...[10, 5, 1, 1, 1, 1, 1]);
        expect(result).to.deep.equal(5);
    });
});