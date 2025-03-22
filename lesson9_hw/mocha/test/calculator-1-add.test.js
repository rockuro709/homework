const Calculator = require('../../calculator.js');
const expect = require('chai').expect;

const calculator = new Calculator();

const positiveTestCasesForAdd = [
    {args: [1, 2], expected: 3},
    {args: [1, 2, 3], expected: 6},
    {args: [-1, -2, -3, -4], expected: -10},
    {args: [1, 2, -3, -4, 5], expected: 1},
    {args: [5], expected: 5},
    {args: [1000000000000000, 6000000000000000], expected: 7000000000000000},
    {args: [1.5, 2.9, 3.1], expected: 7.5}
];

describe('Positive cases for Calculator\'s method \"Add\":', () => {
    positiveTestCasesForAdd.forEach(testCase => {
        it(`these figures should be summed up correctly: ${testCase.args} = ${testCase.expected}`, () => {
            const result = calculator.add(...testCase.args);
            expect(result).to.deep.equal(testCase.expected);    
        });
    });
    it(`separate test for huge array: array with 100k elements should be summed up correctly`, () => {
        const result = calculator.add(...Array(100000).fill(1));
        expect(result).to.deep.equal(100000);
    });
});

const negativeTestCasesForAdd = [
    {args: ['1', '2', '3'], expected: '0123'},
    {args: [1, 2, '3'], expected: '33'},
    {args: ['1', 2, '3'], expected: '0123'},
    {args: ['1', 2, 3], expected: '0123'}
];

const invalidTypesForAdd = [
    {args: [true], expected: 1},
    {args: [false], expected: 0},
    {args: [null], expected: 0},
    {args: [undefined], expected: NaN},
    {args: [NaN], expected: NaN}
];

describe('Negative cases for Calculator\'s method \"Add\":', () => {
    negativeTestCasesForAdd.forEach(testCase => {
        it(`elements ${testCase.args} of string and number types should be concatenated to ${testCase.expected}`, () => {
            const result = calculator.add(...testCase.args);
            expect(result).to.deep.equal(testCase.expected);        
        });
    });
    invalidTypesForAdd.forEach(testCase => {
        it(`should return ${testCase.expected} for element ${testCase.args} of invalid type`, () => {
            const result = calculator.add(...testCase.args);
            expect(result).to.deep.equal(testCase.expected);        
        });
    });
    it('should return 0 for missing arguments', () => {
        const result = calculator.add();
        expect(result).to.deep.equal(0);
    });
});