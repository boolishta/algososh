import React, { FormEventHandler, useEffect, useState } from 'react';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './fibonacci-page.module.css';
import { Circle } from '../ui/circle/circle';
import { fibonacci } from '../../utils/fibonacci';
import { useCurrentIndex } from '../../hooks';

export const FibonacciPage: React.FC = () => {
  const [fibonacciArray, setFibonacciArray] = useState<number[]>([]);
  const [showAnimate, setShowAnimate] = useState(false);
  const { currentIndex, setCurrentIndex } = useCurrentIndex(
    fibonacciArray.length - 1
  );
  const onHandleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const number = formData.get('number');
    setFibonacciArray(fibonacci(Number(number)));
    setShowAnimate(true);
    setCurrentIndex(0);
  };
  useEffect(() => {
    if (currentIndex === fibonacciArray.length - 1) {
      setShowAnimate(false);
    }
  }, [currentIndex, fibonacciArray]);
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form
        onSubmit={onHandleSubmit}
        className={styles.form}
      >
        <Input
          placeholder="Введите текст"
          type="number"
          min={1}
          max={19}
          isLimitText={true}
          name="number"
          required
        />
        <Button
          text="Рассчитать"
          type="submit"
          isLoader={showAnimate}
        />
      </form>
      {fibonacciArray.length > 0 && (
        <ul className={styles.list}>
          {fibonacciArray.slice(0, currentIndex + 1).map((item, idx) => (
            <li key={idx}>
              <Circle
                tail={`${idx}`}
                letter={`${item}`}
              />
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
