import { getSelectionSortedArray, getBubbleSortedArray } from './utils';
import { Direction } from '../../types/direction';

describe('Тестирование алгоритмов сортировки выбором', () => {
  test('Корректно сортирует пустой массив', () => {
    expect(getSelectionSortedArray([], Direction.Ascending)).toStrictEqual([]);
  });
  test('Корректно сортирует массив из одного элемента', () => {
    expect(getSelectionSortedArray([1], Direction.Ascending)).toStrictEqual([
      [1],
    ]);
  });
  test('Корректно сортирует массив из нескольких элементов', () => {
    expect(
      getSelectionSortedArray([3, 5, 15, 1, 9], Direction.Ascending)
    ).toStrictEqual([
      [1, 5, 15, 3, 9],
      [1, 3, 15, 5, 9],
      [1, 3, 5, 15, 9],
      [1, 3, 5, 9, 15],
      [1, 3, 5, 9, 15],
    ]);
  });
});
describe('Тестирование алгоритмов сортировки пузырьком', () => {
  test('Корректно сортирует пустой массив', () => {
    expect(getBubbleSortedArray([], Direction.Ascending)).toStrictEqual([[]]);
  });
  test('Корректно сортирует массив из одного элемента', () => {
    expect(getBubbleSortedArray([1], Direction.Ascending)).toStrictEqual([[1]]);
  });
  test('Корректно сортирует массив из нескольких элементов', () => {
    expect(
      getBubbleSortedArray([3, 5, 15, 1, 9], Direction.Ascending)
    ).toStrictEqual([
      [3, 5, 15, 1, 9],
      [3, 5, 1, 15, 9],
      [3, 5, 1, 9, 15],
      [3, 1, 5, 9, 15],
      [1, 3, 5, 9, 15],
    ]);
  });
});
