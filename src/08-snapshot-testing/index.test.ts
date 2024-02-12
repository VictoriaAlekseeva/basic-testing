// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const elements = [1, 'ggg', undefined];
    const expectedLinkedList = {
      value: 1,
      next: {
        value: 'ggg',
        next: {
          value: null,
          next: {
            value: null,
            next: null,
          },
        }
      }
    }
    expect(generateLinkedList(elements)).toStrictEqual(expectedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList([1, 'ff'])
    expect(linkedList).toMatchSnapshot();
  });
});
