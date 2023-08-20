import React, { FormEventHandler, useEffect, useState } from 'react';
import { Button } from '../ui/button/button';
import { RadioInput } from '../ui/radio-input/radio-input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Direction } from '../../types/direction';
import styles from './sorting-page.module.css';
import { randomArr } from '../../utils/randomArr';
import { DELAY_IN_MS } from '../../constants/delays';
import { getBubbleSortedArray, getItemState } from './utils';
import { Algorithm } from './type';

const MIN_LENGTH = 3;
const MAX_LENGTH = 17;

export const SortingPage: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<Algorithm | null>(null);
  const [direction, setDirection] = useState<Direction>(Direction.Ascending);
  const [isLoading, setIsLoading] = useState(false);
  const [array, setArray] = useState<number[]>([]);
  const [step, setStep] = useState<number | null>(null);
  const [algorithmSteps, setAlgorithmSteps] = useState<number[][]>();
  const [currentAlgorithmStep, setCurrentAlgorithmStep] = useState<number[]>(
    []
  );

  const selectionSortArray = () => {};

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const algorithm = formData.get('algorithm')?.toString() || null;
    const arr = randomArr(MIN_LENGTH, MAX_LENGTH);
    setAlgorithm(algorithm as Algorithm);
    setArray(arr);
  };

  const startAlgorithm = () => {
    if (array.length === 0) return;
    let steps: number[][] = [];
    if (algorithm === Algorithm.Selection) {
      selectionSortArray();
    } else if (algorithm === Algorithm.Bubble) {
      steps = getBubbleSortedArray(array, direction);
    }
    if (steps.length) {
      setAlgorithmSteps(steps);
      setStep(null);
      setIsLoading(true);
      let intervalId: NodeJS.Timer;
      const stepCount = steps.length;
      let currentStep = 0;
      setCurrentAlgorithmStep(steps[currentStep]);
      intervalId = setInterval(() => {
        setStep(currentStep);
        if (currentStep < stepCount) {
          setCurrentAlgorithmStep(steps[currentStep]);
        } else {
          clearInterval(intervalId);
          setIsLoading(false);
        }
        currentStep++;
      }, DELAY_IN_MS);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      startAlgorithm();
    }
    return () => {
      isMounted = false;
    };
  }, [array]);

  const getItemClassName = (index: number) => {
    const state = getItemState(index, step, algorithmSteps);
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
        {currentAlgorithmStep.map((num, index) => (
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
