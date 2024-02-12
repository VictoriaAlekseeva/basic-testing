// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios', () => ({ create: jest.fn() }));
jest.mock('lodash', () => ({ throttle: jest.fn((fn) => fn) }));

const baseURL = 'https://jsonplaceholder.typicode.com';
const path = '/user1';
const resp = { data: { usersID: 1, userName: 'John' } };

beforeEach(() => {
  const getMock = jest.fn().mockResolvedValue(resp);
  (axios.create as jest.Mock).mockImplementation(() => ({
    get: getMock,
  }));
});

afterEach(() => jest.clearAllMocks());

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(path);
    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(path);
    expect(axios.create().get).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    const responseData = await throttledGetDataFromApi(path);
    expect(responseData).toEqual(resp.data);
  });
});
