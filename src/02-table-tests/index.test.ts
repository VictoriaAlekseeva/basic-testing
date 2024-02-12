// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: -1, b: 2, action: Action.Add, expected: 1 },
  { a: -2, b: 2, action: Action.Add, expected: 0 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: -5, b: -2, action: Action.Add, expected: -7 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: -5, b: -2, action: Action.Subtract, expected: -3 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: -3, b: 2, action: Action.Multiply, expected: -6 },
  { a: 0, b: 2, action: Action.Multiply, expected: 0 },
  { a: 0.75, b: 2, action: Action.Multiply, expected: 1.5 },
  { a: -1, b: 2, action: Action.Divide, expected: -0.5 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 0, b: 2, action: Action.Divide, expected: 0 },
  { a: 2, b: 0, action: Action.Divide, expected: Infinity },
  { a: -2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: -2, b: 3, action: Action.Exponentiate, expected: -8 },
  { a: 3, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 9, b: 0.5, action: Action.Exponentiate, expected: 3 },
  { a: -2, b: 2, action: 'Add', expected: null },
  { a: '-2', b: 3, action: Action.Exponentiate, expected: null },
  { a: '3', b: 0, action: Action.Add, expected: null },
  { a: {}, b: 1, action: Action.Add, expected: null },
  // continue cases for other actions
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  // test('should blah-blah', () => {
  //   expect(true).toBe(true);
  // });
  // Consider to use Jest table tests API to test all cases above
  testCases.forEach(({ a, b, action, expected }) => {
    test(`should ${action} ${a} and ${b} to equal ${expected}`, () => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    });
  });
});
