import React, { FormEventHandler, useEffect, useState } from 'react';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './string.module.css';
import { Circle } from '../ui/circle/circle';
import { DELAY_IN_MS } from '../../constants/delays';
import { getLetterState, getReversingStringSteps } from './utils';

export const StringComponent: React.FC = () => {
  const [string, setString] = useState('');
  const [currentAlgorithmStep, setCurrentAlgorithmStep] = useState<string[]>(
    []
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [step, setStep] = useState<number | null>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const str = formData.get('string')?.toString() || '';
    setString(str);
    event.currentTarget.reset();
  };

  const startAlgorithm = () => {
    if (string.length === 0) return;
    const steps = getReversingStringSteps(string);
    if (steps.length) {
      setStep(null);
      setIsLoaded(true);
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
          setIsLoaded(false);
        }
        currentStep++;
      }, DELAY_IN_MS);
    }
  };

  useEffect(() => {
    startAlgorithm();
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
          isLoader={isLoaded}
        />
      </form>
      {currentAlgorithmStep && (
        <ul className={styles.list}>
          {currentAlgorithmStep.map((char, index) => (
            <li key={index}>
              <Circle
                letter={char}
                state={getLetterState(step, index, string.length)}
              />
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
