const Calculator = require('../../calculator.js');
const expect = require('chai').expect;

const calculator = new Calculator();

const positiveTestCasesForDivide = [
    {args: [10, 5], expected: 2},
    {args: [7, 3], expected: 2.3333333333333335},
    {args: [15, 1], expected: 15},
    {args: [8, 8], expected: 1},
    {args: [0, 5], expected: 0},
    {args: [-10, 5], expected: -2},
    {args: [5, -5], expected: -1},
    {args: [-5, -5], expected: 1},
    {args: [1000000000000000, 2], expected: 500000000000000},
    {args: [2.9, 1.5], expected: 1.9333333333333333},
    {args: [3, 7], expected: 0.42857142857142855}
];

describe('Positive cases for Calculator\'s method \"Divide\":', () => {
    positiveTestCasesForDivide.forEach(testCase => {
        it(`dividing should be done correctly: ${testCase.args} = ${testCase.expected}`, () => {
            const result = calculator.divide(...testCase.args);
            expect(result).to.deep.equal(testCase.expected);    
        });
    });
    
});

const negativeTestCasesForDivide = [
    {args: [10, 0], expected: Infinity},
    {args: [-Infinity, 10], expected: -Infinity},  
    {args: [1, Infinity], expected: 0},
];

const invalidTypesForDivide = [
    {args: [true, true], expected: 1},
    {args: [false, false], expected: NaN},
    {args: [null, null], expected: NaN},
    {args: [undefined, undefined], expected: NaN},
    {args: [NaN, NaN], expected: NaN},
    {args: ['10', 1], expected: 10},
    {args: [10, '1'], expected: 10},
    {args: ['10', '1'], expected: 10}
];

describe('Negative cases for Calculator\'s method \"Divide\":', () => {
    negativeTestCasesForDivide.forEach(testCase => {
        it(`dividing should be done correctly: ${testCase.args} = ${testCase.expected}`, () => {
            const result = calculator.divide(...testCase.args);
            expect(result).to.deep.equal(testCase.expected);    
        });
    });
    invalidTypesForDivide.forEach(testCase => {
        it(`should return ${testCase.expected} for elements ${testCase.args} of invalid type`, () => {
            const result = calculator.divide(...testCase.args);
            expect(result).to.deep.equal(testCase.expected);    
        });
    });
    it('should return NaN for missing arguments', () => {
        const result = calculator.divide();
        expect(result).to.deep.equal(NaN);
    });
    it('should return NaN for one missing argument', () => {
        const result = calculator.divide(1);
        expect(result).to.deep.equal(NaN);
    });
    it('should return result for first two elements if too many arguments', () => {
        const result = calculator.divide(...[10, 5, 1, 1, 1, 1, 1]);
        expect(result).to.deep.equal(2);
    });
});