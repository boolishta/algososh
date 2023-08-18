import React, {
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import styles from './list-page.module.css';
import { useLinkedList } from '../../hooks/useLinkedList';
import { useItemState } from '../../hooks';
import { sleep } from '../../utils/sleep';
import { DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';

enum InsertModes {
  Head = 'head',
  Tail = 'tail',
  Index = 'index',
}

export const ListPage: React.FC = () => {
  const {
    listArray,
    append,
    prepend,
    deleteFromHead,
    deleteFromTail,
    deleteAtIndex,
    insertAtIndex,
  } = useLinkedList();
  const { setModifiedState, setChangingState, getItemState } = useItemState();
  const [insertMode, setInsertMode] = useState<InsertModes | null>(null);
  const [value, setValue] = useState<string | null>(null);
  const [removableValue, setRemovableValue] = useState<string | null>(null);
  const [removableIndex, setRemovableIndex] = useState<number | null>(null);
  const [addedIndex, setAddedIndex] = useState<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [array, setArray] = useState<string[]>([]);
  // TODO: loading
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const string = formData.get('string')?.toString() || null;
    const index = formData.get('index') || null;
    if (index !== null) {
      setIndex(Number(index));
    }
    setValue(string);
    form.reset();
  };

  const updateLinkedList = async () => {
    if (value === null) return;
    if (array.length > 0) {
      await sleep(DELAY_IN_MS);
    }
    if (insertMode === InsertModes.Head) {
      prepend(value);
    } else if (insertMode === InsertModes.Tail) {
      append(value);
    } else if (insertMode === InsertModes.Index && index !== null) {
      insertAtIndex(index, value);
    }
    setAddedIndex(() => 0);
    setValue(null);
    if (array.length > 0) {
      if (insertMode === InsertModes.Head) {
        setModifiedState([0]);
      } else if (insertMode === InsertModes.Tail) {
        setModifiedState([array.length]);
      }
      await sleep(DELAY_IN_MS);
      setModifiedState([]);
      setAddedIndex(null);
    }
  };

  const animateItemRemove = async (index: number) => {
    setRemovableValue(array[index]);
    setRemovableIndex(index);
    const tmp = [...array];
    tmp.splice(index, 1, '');
    setArray(tmp);
    await sleep(DELAY_IN_MS);
    setRemovableValue(null);
    setRemovableIndex(null);
  };

  const removeFromHead = async () => {
    if (array.length === 0) return;
    animateItemRemove(0);
    await sleep(DELAY_IN_MS);
    deleteFromHead();
  };

  const removeFromTail = async () => {
    if (array.length === 0) return;
    animateItemRemove(array.length - 1);
    await sleep(DELAY_IN_MS);
    deleteFromTail();
  };

  useEffect(() => {
    updateLinkedList();
  }, [value]);
  useEffect(() => {
    if (index === null) return;
    deleteAtIndex(index);
  }, [index]);
  useEffect(() => {
    setArray(listArray);
  }, [listArray]);

  const getHeadItem = useCallback(
    (itemIndex: number) => {
      if (value && 0 === itemIndex) {
        //TODO:сделать что бы кружок появлялся у изменяемого индекса
        return (
          <Circle
            isSmall={true}
            letter={value}
            state={ElementStates.Changing}
          />
        );
      }
      if (itemIndex !== 0) return null;
      return 'head';
    },
    [value, addedIndex]
  );
  const getTailItem = useCallback(
    (itemIndex: number) => {
      if (removableValue && itemIndex === removableIndex) {
        return (
          <Circle
            isSmall={true}
            letter={removableValue}
            state={ElementStates.Changing}
          />
        );
      }
      if (itemIndex !== array.length - 1) return null;
      return 'tail';
    },
    [removableValue, removableIndex, array]
  );
  return (
    <SolutionLayout title="Связный список">
      <form onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <Input
            placeholder="Введите значение"
            isLimitText={true}
            maxLength={4}
            name="string"
          />
          <Button
            text="Добавить в head"
            type="submit"
            onClick={() => setInsertMode(InsertModes.Head)}
          />
          <Button
            text="Добавить в tail"
            type="submit"
            onClick={() => setInsertMode(InsertModes.Tail)}
          />
          <Button
            text="Удалить из head"
            onClick={removeFromHead}
          />
          <Button
            text="Удалить из tail"
            onClick={removeFromTail}
          />
        </div>
        <div className={styles.grid}>
          <Input
            placeholder="Введите индекс"
            type="number"
            name="index"
          />
          <Button
            extraClass={styles.double}
            text="Добавить по индексу"
            type="submit"
            onClick={() => setInsertMode(InsertModes.Index)}
          />
          <Button
            extraClass={styles.double}
            text="Удалить по индексу"
            type="submit"
            onClick={() => setInsertMode(null)}
          />
        </div>
      </form>
      <ul className={styles.list}>
        {array.map((value, index) => (
          <li
            key={index}
            className={styles.item}
          >
            <Circle
              head={getHeadItem(index)}
              tail={getTailItem(index)}
              index={index}
              letter={value}
              state={getItemState(index)}
            />
            <ArrowIcon />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
