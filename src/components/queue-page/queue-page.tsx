import React, { FormEventHandler, useEffect, useState } from 'react';
import { DELAY_IN_MS } from '../../constants/delays';
import { useItemState } from '../../hooks';
import { sleep } from '../../utils/sleep';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './queue-page.module.css';

const QUEUE_SIZE = 7;
const INITIAL_QUEUE = Array(QUEUE_SIZE).fill(undefined);

export const QueuePage: React.FC = () => {
  const [item, setItem] = useState<string>();
  const [head, setHead] = useState<number | null>(null);
  const [tail, setTail] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [queue, setQueue] = useState<(string | undefined)[]>(INITIAL_QUEUE);
  const { setChangingState, getItemState } = useItemState();
  const enqueue: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const string = formData.get('string')?.toString();
    setIsLoading(true);
    setItem(string);
    setTail((prevState) => (prevState !== null ? prevState + 1 : 0));
    form.reset();
  };
  const dequeue = async () => {
    if (head !== null && tail !== null && head < tail) {
      setIsLoading(true);
      setChangingState([head, tail]);
      await sleep(DELAY_IN_MS);
      setHead((prevState) => (prevState !== null ? prevState + 1 : 0));
    } else if (head === null) {
      setHead(0);
    }
  };
  const updateTailQueue = async () => {
    setQueue((prevState) => {
      const newState = [...prevState];
      newState.splice(tail ? tail : 0, 1, item);
      return newState;
    });
    if (tail !== null) {
      setChangingState([tail]);
    }
    if (tail === 0) {
      setHead(0);
    }
    setIsLoading(false);
  };
  const updateHeadQueue = () => {
    if (head !== null && tail !== null && head > 0) {
      setChangingState([tail]);
      setQueue((prevState) => {
        const newState = [...prevState];
        newState.splice(head ? head - 1 : 0, 1, undefined);
        return newState;
      });
      setIsLoading(false);
    }
  };
  useEffect(() => {
    updateTailQueue();
  }, [tail]);
  useEffect(() => {
    updateHeadQueue();
  }, [head]);
  const resetForm = () => {
    setQueue(INITIAL_QUEUE);
    setHead(null);
    setTail(null);
    setItem(undefined);
    setChangingState([]);
  };
  const isHead = (index: number) => {
    return head === index ? 'head' : null;
  };
  const isTail = (index: number) => {
    return tail === index ? 'tail' : null;
  };
  const disabled = () => tail === QUEUE_SIZE - 1;
  return (
    <SolutionLayout title="Очередь">
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
          disabled={isLoading || disabled()}
        />
        <Button
          text="Добавить"
          type="submit"
          isLoader={isLoading}
          disabled={disabled()}
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
        {queue.map((item, index) => (
          <li key={`${item}-${index}`}>
            <Circle
              head={isHead(index)}
              tail={isTail(index)}
              letter={item}
              index={index}
              state={getItemState(index)}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
