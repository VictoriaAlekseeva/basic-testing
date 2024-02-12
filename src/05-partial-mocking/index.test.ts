import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const logSpy = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(mockOne).toHaveBeenCalled();
    expect(mockTwo).toHaveBeenCalled();
    expect(mockThree).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(0);
    logSpy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(console, 'log');

    unmockedFunction();
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('I am not mocked');
    expect(logSpy.mock.calls).toContainEqual(['I am not mocked']);
    logSpy.mockRestore();
  });
});
