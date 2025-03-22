const Calculator = require('../../calculator.js');
const expect = require('chai').expect;

const calculator = new Calculator();

const positiveTestCasesForMultiply = [
    {args: [1, 2], expected: 2},
    {args: [1, 2, 3], expected: 6},
    {args: [-1, -2, -3, -4], expected: 24},
    {args: [1, 2, -3, -4, 5], expected: 120},
    {args: [5], expected: 5},
    {args: [1000000000000000, 6000000000000000], expected: 6e+30},
    {args: [1.5, 2.9, 3.1], expected: 13.485},
    {args: [11.5, 2.49, 3.117], expected: 89.255295},
    {args: [1.5, 2.9, 3.1], expected: 13.485}
];

describe('Positive cases for Calculator\'s method \"Multiply\":', () => {
    positiveTestCasesForMultiply.forEach(testCase => {
        it(`multiplying should be done correctly: ${testCase.args} = ${testCase.expected}`, () => {
            const result = calculator.multiply(...testCase.args);
            expect(result).to.deep.equal(testCase.expected);    
        });
    });
    it(`separate test for huge array: array with 100k elements should be multiplied correctly`, () => {
        const result = calculator.multiply(...Array(100000).fill(1));
        expect(result).to.deep.equal(1);
    });
});

const negativeTestCasesForMultiply = [
    {args: ['1', '2', '3'], expected: 6},
    {args: [1, 2, '3'], expected: 6},
    {args: ['1', 2, '3'], expected: 6},
    {args: ['1', 2, 3], expected: 6}
];

const invalidTypesForMultiply = [
    {args: [true], expected: 1},
    {args: [false], expected: 0},
    {args: [null], expected: 0},
    {args: [undefined], expected: NaN},
    {args: [NaN], expected: NaN}
];

describe('Negative cases for Calculator\'s method \"Multiply\":', () => {
    negativeTestCasesForMultiply.forEach(testCase => {
        it(`multiplying should be done correctly: ${testCase.args} = ${testCase.expected}`, () => {
            const result = calculator.multiply(...testCase.args);
            expect(result).to.deep.equal(testCase.expected);        
        });
    });
    invalidTypesForMultiply.forEach(testCase => {
        it(`should return ${testCase.expected} for element ${testCase.args} of invalid type`, () => {
            const result = calculator.multiply(...testCase.args);
            expect(result).to.deep.equal(testCase.expected);        
        });
    });
    it('should return 1 for missing arguments', () => {
        const result = calculator.multiply();
        expect(result).to.deep.equal(1);
    });
});