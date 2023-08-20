import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { swap } from '../../utils/swap';
import { Algorithm } from './type';

export function getBubbleSortedArray(
  array: number[],
  direction: Direction
): number[][] {
  const sortedArrays: number[][] = [];
  sortedArrays[0] = array;
  for (let i = 0; i < array.length; i++) {
    const currentArray = [...sortedArrays[sortedArrays.length - 1]];
    let hasSwapped = false;

    for (let j = 0; j < currentArray.length - 1; j++) {
      const shouldSwap =
        direction === Direction.Ascending
          ? currentArray[j] > currentArray[j + 1]
          : currentArray[j] < currentArray[j + 1];
      if (shouldSwap) {
        swap(currentArray, j, j + 1);
        hasSwapped = true;
        sortedArrays.push([...currentArray]);
      }
    }

    if (!hasSwapped) {
      break;
    }
  }

  return sortedArrays;
}

export function getItemState(
  currentIndex: number,
  currentStep: number | null,
  algorithmSteps: number[][] | undefined
) {
  if (!algorithmSteps || currentStep === null) {
    return ElementStates.Default;
  }

  const currentElement =
    algorithmSteps &&
    algorithmSteps[currentStep] &&
    algorithmSteps[currentStep][currentIndex];
  const nextStep = algorithmSteps[currentStep + 1];

  if (!nextStep) {
    return ElementStates.Default;
  }

  let state = ElementStates.Default;
  const nextStepElement = nextStep[currentIndex];

  if (nextStepElement === currentElement) {
    state = ElementStates.Default;
  }

  if (nextStepElement !== currentElement) {
    state = ElementStates.Changing;
  }

  let positionChanged = false;

  for (let step = currentStep + 1; step < algorithmSteps.length; step++) {
    const futureStep = algorithmSteps[step];
    if (futureStep[currentIndex] !== currentElement) {
      positionChanged = true;
      break;
    }
  }

  if (!positionChanged) {
    state = ElementStates.Modified;
  }

  return state;
}
