import { useState } from 'react';
import { ElementStates } from '../types/element-states';

export function useItemState() {
  const [changingState, setChangingState] = useState<number[]>([]);
  const [modifiedState, setModifiedState] = useState<number[]>([]);

  const getItemState = (id: number) => {
    let state = ElementStates.Default;
    if (modifiedState.includes(id)) {
      state = ElementStates.Modified;
    }
    if (changingState.includes(id)) {
      state = ElementStates.Changing;
    }
    return state;
  };

  return {
    setChangingState,
    setModifiedState,
    getItemState,
  };
}
