import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'test';
    const resolvedValue = await resolveValue(value);
    expect(resolvedValue).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMessage = 'Test Error';
    const errorTest = () => throwError(errorMessage);

    // const errorMessage = 'Test Error';
    expect(errorTest).toThrowError(errorMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    const errorTest = () => throwError();
    expect(errorTest).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
