import React, { FormEventHandler, useEffect, useState } from 'react';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './fibonacci-page.module.css';
import { Circle } from '../ui/circle/circle';
import { fibonacci } from './utils';
import { useCurrentIndex, useForm } from '../../hooks';

export const FibonacciPage: React.FC = () => {
  const [fibonacciArray, setFibonacciArray] = useState<number[]>([]);
  const [showAnimate, setShowAnimate] = useState(false);
  const { currentIndex, setCurrentIndex } = useCurrentIndex(
    fibonacciArray.length - 1
  );
  const [isDisabled, setIsDisabled] = useState(true);
  const { handleChange, values } = useForm({
    number: '',
  });
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
  useEffect(() => {
    setIsDisabled(() => values.number.length === 0);
  }, [values]);
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
          data-cy="input"
          onChange={handleChange}
        />
        <Button
          text="Рассчитать"
          type="submit"
          isLoader={showAnimate}
          disabled={isDisabled}
          data-cy="submit"
        />
      </form>
      {fibonacciArray.length > 0 && (
        <ul className={styles.list}>
          {fibonacciArray.slice(0, currentIndex + 1).map((item, idx) => (
            <li
              key={idx}
              data-cy="item"
            >
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
