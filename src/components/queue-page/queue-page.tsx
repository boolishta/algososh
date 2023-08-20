import React, { FormEventHandler, useEffect, useState } from 'react';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './queue-page.module.css';
import { Queue } from './utils';
import { useItemState } from '../../hooks';
import { sleep } from '../../utils/sleep';
import { DELAY_IN_MS } from '../../constants/delays';

const queue = new Queue<string>(7);

export const QueuePage: React.FC = () => {
  const [item, setItem] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [queueArray, setQueueArray] = useState<(string | null)[]>(
    queue.toArray()
  );
  const { setChangingState, getItemState } = useItemState();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const string = formData.get('string')?.toString() || null;
    setItem(string);
    form.reset();
  };

  const addToQueue = async () => {
    if (item) {
      setIsLoading(true);
      queue.enqueue(item);
      setQueueArray(queue.toArray());
      setItem(null);
      const changingIndex = queue.tailIndex();
      if (changingIndex !== null) {
        setChangingState([changingIndex]);
        await sleep(DELAY_IN_MS);
      }
      setChangingState([]);
      setIsLoading(false);
    }
  };

  const remove = async () => {
    setIsLoading(true);
    const changingIndex = queue.headIndex();
    if (changingIndex !== null) {
      setChangingState([changingIndex]);
      await sleep(DELAY_IN_MS);
    }
    queue.dequeue();
    setQueueArray(queue.toArray());
    setChangingState([]);
    setIsLoading(false);
  };

  const reset = () => {
    queue.reset();
    setQueueArray(queue.toArray());
  };

  const getHead = (index: number) =>
    index === queue.headIndex() ? 'head' : null;

  const getTail = (index: number) =>
    index === queue.tailIndex() ? 'tail' : null;

  const isFull = () => queue.full();

  useEffect(() => {
    addToQueue();
  }, [item]);

  return (
    <SolutionLayout title="Очередь">
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
          disabled={isFull()}
        />
        <Button
          text="Добавить"
          type="submit"
          isLoader={isLoading}
          disabled={isFull()}
        />
        <Button
          text="Удалить"
          type="button"
          onClick={remove}
          isLoader={isLoading}
          disabled={queue.isEmpty()}
        />
        <Button
          extraClass="ml-35"
          text="Очистить"
          type="button"
          onClick={reset}
        />
      </form>
      <ul className={styles.list}>
        {queueArray.map((item, index) => (
          <li key={`${item}-${index}`}>
            <Circle
              head={getHead(index)}
              tail={getTail(index)}
              letter={item ?? undefined}
              index={index}
              state={getItemState(index)}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
