const Calculator = require('../../calculator.js');
const expect = require('chai').expect;

const calculator = new Calculator();

const positiveTestCasesForExponentiation = [
    {args: 3, expected: 9},
    {args: -4, expected: 16},
    {args: 0, expected: 0},
    {args: 1.5, expected: 2.25},
    {args: 1000, expected: 1000000},
    {args: 1, expected: 1},
    {args: -2.5, expected: 6.25}
];

describe('Positive cases for Calculator\'s method \"Exponentiation\":', () => {
    positiveTestCasesForExponentiation.forEach(testCase => {
        it(`exponentiation should be done correctly: ${testCase.args} = ${testCase.expected}`, () => {
            const result = calculator.exponentiation(testCase.args);
            expect(result).to.deep.equal(testCase.expected);    
        });
    });
    
});

const negativeTestCasesForExponentiation = [
    {args: [10], expected: 100},
    {args: Infinity, expected: Infinity},
    {args: '4.5', expected: 20.25},
    {args: Number.MAX_SAFE_INTEGER, expected: 8.112963841460666e+31}
];

 const invalidTypesForExponentiation = [
    {args: true, expected: 1},
    {args: false, expected: 0},
    {args: null, expected: 0},
    {args: undefined, expected: NaN},
    {args: NaN, expected: NaN},
]; 

describe('Negative cases for Calculator\'s method \"Exponentiation\":', () => {
    negativeTestCasesForExponentiation.forEach(testCase => {
        it(`exponentiation should be done correctly: ${testCase.args} = ${testCase.expected}`, () => {
            const result = calculator.exponentiation(testCase.args);
            expect(result).to.deep.equal(testCase.expected);    
        });
    });
    invalidTypesForExponentiation.forEach(testCase => {
        it(`should return ${testCase.expected} for element ${testCase.args} of invalid type`, () => {
            const result = calculator.exponentiation(testCase.args);
            expect(result).to.deep.equal(testCase.expected);    
        });
    });
    it('should return NaN for missing argument', () => {
        const result = calculator.exponentiation();
        expect(result).to.deep.equal(NaN);
    });
    it('should return result for first element if too many arguments', () => {
        const result = calculator.exponentiation(10, 5);
        expect(result).to.deep.equal(100);
    });
});