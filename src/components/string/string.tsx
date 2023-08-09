import React, { FormEventHandler, useEffect, useState } from 'react';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './string.module.css';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { sleep } from '../../utils/sleep';
import { swap } from '../../utils/swap';
import { DELAY_IN_MS } from '../../constants/delays';

export const StringComponent: React.FC = () => {
  const [string, setString] = useState<string[]>([]);
  const [changingState, setChangingState] = useState<number[]>([]);
  const [modifiedState, setModifiedState] = useState<number[]>([]);
  const [reversedString, setReversedString] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const str = formData.get('string')?.toString() || '';
    setString(() => str.split(''));
    setReversedString(() => str.split(''));
    setChangingState([]);
    setModifiedState([]);
    setDisabled(true);
  };

  const getCharState = (id: number) => {
    let state = ElementStates.Default;
    if (modifiedState.includes(id)) {
      state = ElementStates.Modified;
    } else if (changingState.includes(id)) {
      state = ElementStates.Changing;
    }
    return state;
  };

  const reverseString = async () => {
    const len = string.length;
    for (let i = 0; i < len / 2; i++) {
      const start = i,
        end = len - i - 1;
      await sleep(DELAY_IN_MS);
      setChangingState([start, end]);
      await sleep(DELAY_IN_MS);
      swap(reversedString, i, len - i - 1);
      setReversedString([...reversedString]);
      setModifiedState((state) => [...state, start, end]);
    }
    setDisabled(false);
  };

  useEffect(() => {
    reverseString();
  }, [string]);

  return (
    <SolutionLayout title="Строка">
      <form
        className={styles.form}
        onSubmit={onSubmit}
      >
        <Input
          placeholder="Введите текст"
          maxLength={11}
          isLimitText={true}
          required
          name="string"
        />
        <Button
          text="Рассчитать"
          type="submit"
          disabled={disabled}
        />
      </form>
      {reversedString && (
        <ul className={styles.list}>
          {reversedString.map((char, index) => (
            <li key={index}>
              <Circle
                letter={char}
                state={getCharState(index)}
              />
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
