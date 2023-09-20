import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { swap } from '../../utils/swap';

export function getSelectionSortedArray(
  array: number[],
  direction: Direction
): number[][] {
  const sortedArrays: number[][] = [];
  const n = array.length;

  for (let i = 0; i < n; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      if (
        (direction === Direction.Ascending && array[j] < array[minIndex]) ||
        (direction === Direction.Descending && array[j] > array[minIndex])
      ) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      swap(array, i, minIndex);
    }

    sortedArrays.push([...array]);
  }

  return sortedArrays;
}

export function getBubbleSortedArray(
  array: number[],
  direction: Direction
): number[][] {
  const sortedArrays: number[][] = [];
  sortedArrays[0] = array;
  for (let i = 0; i < array.length; i++) {
    const currentArray = [...sortedArrays[sortedArrays.length - 1]];
    let hasSwapped = false;

    for (let j = 0; j < currentArray.length; j++) {
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

  let hasChangedInPreviousSteps = false;
  for (let step = 0; step < currentStep; step++) {
    const pastStep = algorithmSteps[step];
    if (pastStep[currentIndex] !== currentElement) {
      hasChangedInPreviousSteps = true;
      break;
    }
  }

  let willStayInPlace = true;
  for (let step = currentStep + 1; step < algorithmSteps.length; step++) {
    const futureStep = algorithmSteps[step];
    if (futureStep[currentIndex] !== currentElement) {
      willStayInPlace = false;
      break;
    }
  }

  if (hasChangedInPreviousSteps && willStayInPlace) {
    state = ElementStates.Modified;
  }

  return state;
}
