import { ElementStates } from '../../types/element-states';
import { swap } from '../../utils/swap';

export function getReversingStringSteps(sourceString: string): string[][] {
  const length = sourceString.length;
  let result: string[][] = [];
  result[0] = sourceString.split('');

  for (let i = 0; i < length / 2; i++) {
    const start = i,
      end = length - i - 1;
    const reversedString = [...result[i]];
    swap(reversedString, start, end);
    result[i + 1] = reversedString;
  }

  return result;
}

export function getLetterState(
  step: number | null,
  index: number,
  length: number
): ElementStates {
  let state = ElementStates.Default;
  if (step === null) {
    return state;
  }
  if (index === step || length - index - 1 === step)
    state = ElementStates.Changing;
  if (index < step || index > length - 1 - step) {
    state = ElementStates.Modified;
  }
  return state;
}
