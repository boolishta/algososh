import React, { FormEventHandler, useEffect, useState } from 'react';
import { DELAY_IN_MS } from '../../constants/delays';
import { useItemState } from '../../hooks';
import { sleep } from '../../utils/sleep';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './stack-page.module.css';
import { Stack } from './utils';

const stack = new Stack<string>();

export const StackPage: React.FC = () => {
  const [string, setString] = useState<string | null>(null);
  const [stackArray, setStackArray] = useState<string[]>(stack.toArray());
  const [isLoading, setIsLoading] = useState(false);
  const { setChangingState, getItemState } = useItemState();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const string = formData.get('string')?.toString();
    if (string) {
      setString(string);
      form.reset();
    }
  };

  const addToStack = async () => {
    if (string) {
      setIsLoading(true);
      stack.push(string);
      setStackArray(stack.toArray());
      setChangingState([stack.getSize() - 1]);
      await sleep(DELAY_IN_MS);
    }
    setIsLoading(false);
    setString(null);
    setChangingState([]);
  };

  const removeFromStack = async () => {
    if (!stack.getSize()) return;
    setIsLoading(true);
    setChangingState([stack.getSize() - 1]);
    await sleep(DELAY_IN_MS);
    stack.pop();
    setStackArray(stack.toArray());
    setIsLoading(false);
    setChangingState([]);
  };

  const resetStack = () => {
    stack.reset();
    setStackArray(stack.toArray());
  };

  useEffect(() => {
    addToStack();
  }, [string]);

  return (
    <SolutionLayout title="Стек">
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <Input
          maxLength={4}
          isLimitText={true}
          extraClass={styles.input}
          name="string"
          required
          disabled={isLoading}
        />
        <Button
          text="Добавить"
          type="submit"
          isLoader={isLoading}
        />
        <Button
          text="Удалить"
          type="button"
          onClick={removeFromStack}
          isLoader={isLoading}
        />
        <Button
          extraClass="ml-35"
          text="Очистить"
          type="button"
          disabled={isLoading}
          onClick={resetStack}
        />
      </form>
      <ul className={styles.list}>
        {stackArray.map((item, idx) => (
          <li key={idx}>
            <Circle
              tail={`${idx}`}
              letter={item}
              head={idx === stackArray.length - 1 ? 'top' : null}
              state={getItemState(idx)}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
