import React, { FormEventHandler, useEffect, useState } from 'react';
import { DELAY_IN_MS } from '../../constants/delays';
import { useItemState } from '../../hooks';
import { sleep } from '../../utils/sleep';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './stack-page.module.css';

export const StackPage: React.FC = () => {
  const [stack, setStack] = useState<string[]>([]);
  const [isPush, setIsPush] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setChangingState, getItemState } = useItemState();
  const enqueue: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const string = formData.get('string')?.toString();
    if (string) {
      setStack((prevState) => [...prevState, string]);
      setIsPush(true);
      setIsLoading(true);
      form.reset();
    }
  };
  const dequeue = async () => {
    if (stack.length === 0) return;
    setIsLoading(true);
    setChangingState([stack.length - 1]);
    await sleep(DELAY_IN_MS);
    setStack((prevState) => [...prevState.slice(0, -1)]);
    setIsLoading(false);
  };
  const resetForm = () => {
    setStack([]);
  };
  const updateStackState = async () => {
    setChangingState([stack.length - 1]);
    await sleep(DELAY_IN_MS);
    setChangingState([]);
    setIsPush(false);
    setIsLoading(false);
  };
  useEffect(() => {
    updateStackState();
  }, [isPush]);
  return (
    <SolutionLayout title="Стек">
      <form
        className={styles.form}
        onSubmit={enqueue}
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
          onClick={dequeue}
          isLoader={isLoading}
        />
        <Button
          extraClass="ml-35"
          text="Очистить"
          type="button"
          disabled={isLoading}
          onClick={resetForm}
        />
      </form>
      <ul className={styles.list}>
        {stack.map((item, idx) => (
          <li key={idx}>
            <Circle
              tail={`${idx}`}
              letter={item}
              head={idx === stack.length - 1 ? 'top' : null}
              state={getItemState(idx)}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
