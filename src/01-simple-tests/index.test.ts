// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: Action.Add });
    expect(result).toBe(8);
    // Write your test here
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: Action.Subtract });
    expect(result).toBe(2);
    // Write your test here
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: Action.Multiply });
    expect(result).toBe(15);
    // Write your test here
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 12, b: 3, action: Action.Divide });
    expect(result).toBe(4);
    // Write your test here
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate });
    expect(result).toBe(8);
    // Write your test here
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: 'add' });
    expect(result).toBeNull()
    // Write your test here
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '5', b: '3', action: Action.Add });
    expect(result).toBe(null);
    const result2 = simpleCalculator({ a: {}, b: 1, action: Action.Add });
    expect(result2).toBe(null);
    // Write your test here
  });
});
