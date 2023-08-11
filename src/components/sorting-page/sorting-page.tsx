import React, { FormEventHandler, useEffect, useState } from 'react';
import { Button } from '../ui/button/button';
import { RadioInput } from '../ui/radio-input/radio-input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Direction } from '../../types/direction';
import styles from './sorting-page.module.css';
import { randomArr } from '../../utils/randomArr';
import { swap } from '../../utils/swap';
import { sleep } from '../../utils/sleep';
import { DELAY_IN_MS } from '../../constants/delays';
import { useItemState } from '../../hooks';

enum Algorithm {
  Selection = 'selection',
  Bubble = 'bubble',
}

export const SortingPage: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<string | null>(null);
  const [direction, setDirection] = useState<Direction>(Direction.Ascending);
  const [isLoading, setIsLoading] = useState(false);
  const [array, setArray] = useState<number[]>([]);
  const [sortedArray, setSortedArray] = useState<number[]>([]);
  const { setChangingState, setModifiedState, getItemState } = useItemState();

  const selectionSortArray = async () => {
    const n = sortedArray.length;
    for (let i = 0; i < n - 1; i++) {
      let indexToSwap = i;
      for (let j = i + 1; j < n; j++) {
        if (
          (direction === Direction.Ascending &&
            sortedArray[j] < sortedArray[indexToSwap]) ||
          (direction === Direction.Descending &&
            sortedArray[j] > sortedArray[indexToSwap])
        ) {
          indexToSwap = j;
        }
      }
      if (indexToSwap !== i) {
        await sleep(DELAY_IN_MS);
        setChangingState([i, indexToSwap]);
        await sleep(DELAY_IN_MS);
        swap(sortedArray, i, indexToSwap);
        setSortedArray([...sortedArray]);
        setModifiedState((state) => [...state, i, indexToSwap]);
        setChangingState([]);
      }
    }
    setIsLoading(false);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const algorithm = formData.get('algorithm')?.toString() || null;
    const arr = randomArr();
    setChangingState([]);
    setModifiedState([]);
    setAlgorithm(algorithm);
    setIsLoading(true);
    setArray(arr);
    setSortedArray(arr);
  };

  useEffect(() => {
    if (algorithm === Algorithm.Selection) {
      selectionSortArray();
      console.log('sort selection');
    } else if (algorithm === Algorithm.Bubble) {
      console.log('sort bubble');
    }
  }, [array]);

  const getItemClassName = (index: number) => {
    const state = getItemState(index);
    return `${styles.column} ${styles[state]}`;
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form
        className={styles.top}
        onSubmit={handleSubmit}
      >
        <div className={styles.algorithms}>
          <RadioInput
            label="Выбор"
            name="algorithm"
            required
            checked
            readOnly
            value={Algorithm.Selection}
            disabled={isLoading}
          />
          <RadioInput
            name="algorithm"
            label="Пузырёк"
            value={Algorithm.Bubble}
            required
            readOnly
            disabled={isLoading}
          />
        </div>
        <div className={styles.sorting}>
          <Button
            type="button"
            text="По возрастанию"
            sorting={Direction.Ascending}
            disabled={isLoading}
            onClick={() => setDirection(Direction.Ascending)}
          />
          <Button
            type="button"
            text="По убыванию"
            sorting={Direction.Descending}
            disabled={isLoading}
            onClick={() => setDirection(Direction.Descending)}
          />
        </div>
        <Button
          text="Новый массив"
          type="submit"
          isLoader={isLoading}
        />
      </form>
      <ul className={styles.list}>
        {sortedArray.map((num, index) => (
          <li key={`${index}-${num}`}>
            <div
              className={getItemClassName(index)}
              style={{ height: (340 * num) / 100 }}
            ></div>
            <div>{num}</div>
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
