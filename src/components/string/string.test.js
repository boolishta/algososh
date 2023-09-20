import { getReversingStringSteps } from './utils';

describe('Разворот строки', () => {
  test('Корректно разворачивает строку с чётным количеством символов', () => {
    expect(getReversingStringSteps('abcd')).toStrictEqual([
      ['a', 'b', 'c', 'd'],
      ['d', 'b', 'c', 'a'],
      ['d', 'c', 'b', 'a'],
    ]);
  });

  test('Корректно разворачивает строку с не чётным количеством символов', () => {
    expect(getReversingStringSteps('qwerty')).toStrictEqual([
      ['q', 'w', 'e', 'r', 't', 'y'],
      ['y', 'w', 'e', 'r', 't', 'q'],
      ['y', 't', 'e', 'r', 'w', 'q'],
      ['y', 't', 'r', 'e', 'w', 'q'],
    ]);
  });

  test('Корректно разворачивает строку с одним символом', () => {
    expect(getReversingStringSteps('w')).toStrictEqual([['w'], ['w']]);
  });

  test('Корректно разворачивает пустую строку', () => {
    expect(getReversingStringSteps('')).toStrictEqual([[]]);
  });
});
