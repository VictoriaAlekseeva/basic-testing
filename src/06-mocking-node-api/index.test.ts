// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs, { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';

jest.mock('fs');
jest.mock('path');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const timeout = 1000;
    const callback = jest.fn();

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    expect(setTimeout).toHaveBeenLastCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toBeCalled();
    // check if callback calls before timeout
    jest.advanceTimersByTime(timeout / 2);
    expect(callback).toHaveBeenCalledTimes(0);
    // check if callback calls after timeout
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const interval = 1000;
    const callback = jest.fn();

    doStuffByInterval(callback, interval);
    expect(callback).not.toHaveBeenCalled();
    expect(setInterval).toHaveBeenLastCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);
    expect(callback).not.toBeCalled();
    // check if callback calls before interval
    jest.advanceTimersByTime(interval / 2);
    expect(callback).toHaveBeenCalledTimes(0);
    // check if callback calls after interval
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);
    // check if callback calls again after interval
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathJoinSpy = jest.spyOn(path, 'join');

    const pathToFile = 'test.txt';

    await readFileAsynchronously(pathToFile);
    expect(pathJoinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
    pathJoinSpy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = await readFileAsynchronously('someFile.txt');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'Some important file content';
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockReturnValue(fileContent);

    const result = await readFileAsynchronously('someFile.txt');

    expect(result).toBe(fileContent);
  });
});
