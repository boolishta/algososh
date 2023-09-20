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
import { useForm, useItemState } from '../../hooks';
import { sleep } from '../../utils/sleep';
import { DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { createIndexArray } from '../../utils/array';
import { InsertModes } from './type';
import { LinkedList } from './utils';

const List = new LinkedList<string>();

export const ListPage: React.FC = () => {
  const { setModifiedState, setChangingState, getItemState } = useItemState();
  const [insertMode, setInsertMode] = useState<InsertModes | null>(null);
  const [value, setValue] = useState<string | null>(null);
  const [removableValue, setRemovableValue] = useState<string | null>(null);
  const [removableIndex, setRemovableIndex] = useState<number | null>(null);
  const [addedIndex, setAddedIndex] = useState<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [array, setArray] = useState<string[]>([]);
  const [isAddedToHead, setIsAddedToHead] = useState(false);
  const [isAddedToTail, setIsAddedToTail] = useState(false);
  const [isRemovedFromHead, setIsRemovedFromHead] = useState(false);
  const [isRemovedFromTail, setIsRemovedFromTail] = useState(false);
  const [isRemovedByIndex, setIsRemovedByIndex] = useState(false);
  const [isAddedByIndex, setIsAddedByIndex] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { values, handleChange } = useForm({
    string: '',
  });
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const string = formData.get('string')?.toString() || null;
    const index = formData.get('index') || null;
    if (index !== null) {
      const num = Number(index);
      setIndex(num);
      setAddedIndex(num);

      if (insertMode === InsertModes.Index && string) {
        setChangingState(createIndexArray(num - 1));
      }
    }
    setValue(string);
    form.reset();
  };

  const updateLinkedList = async () => {
    if (value === null) return;
    if (insertMode === InsertModes.Head) setIsAddedToHead(true);
    if (insertMode === InsertModes.Tail) setIsAddedToTail(true);
    if (insertMode === InsertModes.Index) setIsAddedByIndex(true);
    if (array.length > 0) {
      await sleep(DELAY_IN_MS);
    }
    if (insertMode === InsertModes.Head) {
      List.prepend(value);
      setArray(List.toArray());
    } else if (insertMode === InsertModes.Tail) {
      List.append(value);
      setArray(List.toArray());
    } else if (insertMode === InsertModes.Index && index !== null) {
      List.addByIndex(index, value);
      setArray(List.toArray());
    }
    setValue(null);
    if (array.length > 0) {
      if (insertMode === InsertModes.Head) {
        setModifiedState([0]);
      } else if (insertMode === InsertModes.Tail) {
        setModifiedState([array.length]);
      } else if (insertMode === InsertModes.Index && index !== null) {
        setModifiedState([index]);
      }
      await sleep(DELAY_IN_MS);
      setModifiedState([]);
    }
    setChangingState([]);
    setAddedIndex(null);
    setIndex(null);
    setIsAddedToTail(false);
    setIsAddedToHead(false);
    setIsAddedByIndex(false);
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

  const addToHead = () => {
    setInsertMode(InsertModes.Head);
    setAddedIndex(0);
  };

  const addToTail = () => {
    setInsertMode(InsertModes.Tail);
    setAddedIndex(array.length - 1);
  };

  const addByIndex = () => {
    setInsertMode(InsertModes.Index);
  };

  const removeByIndex = async () => {
    if (
      index !== null &&
      insertMode === InsertModes.Remove &&
      index <= array.length - 1
    ) {
      setIsRemovedByIndex(true);
      animateItemRemove(index);
      await sleep(DELAY_IN_MS);
      List.deleteByIndex(index);
      setArray(List.toArray());
      setIndex(null);
      setIsRemovedByIndex(false);
    }
  };

  const removeFromHead = async () => {
    if (array.length === 0) return;
    setIsRemovedFromHead(true);
    animateItemRemove(0);
    await sleep(DELAY_IN_MS);
    List.deleteHead();
    setArray(List.toArray());
    setIsRemovedFromHead(false);
  };

  const removeFromTail = async () => {
    if (array.length === 0) return;
    setIsRemovedFromTail(true);
    animateItemRemove(array.length - 1);
    await sleep(DELAY_IN_MS);
    List.deleteTail();
    setArray(List.toArray());
    setIsRemovedFromTail(false);
  };

  useEffect(() => {
    updateLinkedList();
  }, [value]);
  useEffect(() => {
    removeByIndex();
  }, [index, insertMode]);

  const getHeadItem = useCallback(
    (itemIndex: number) => {
      if (value && addedIndex === itemIndex) {
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
  useEffect(() => {
    if (values.string.length === 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [values]);
  return (
    <SolutionLayout title="Связный список">
      <form onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <Input
            placeholder="Введите значение"
            isLimitText={true}
            maxLength={4}
            name="string"
            data-cy="input"
            onChange={handleChange}
          />
          <Button
            text="Добавить в head"
            type="submit"
            onClick={addToHead}
            isLoader={isAddedToHead}
            data-cy="addHead"
            disabled={isDisabled}
          />
          <Button
            text="Добавить в tail"
            type="submit"
            onClick={addToTail}
            isLoader={isAddedToTail}
            data-cy="addTail"
            disabled={isDisabled}
          />
          <Button
            text="Удалить из head"
            onClick={removeFromHead}
            isLoader={isRemovedFromHead}
            data-cy="removeHead"
          />
          <Button
            text="Удалить из tail"
            onClick={removeFromTail}
            isLoader={isRemovedFromTail}
            data-cy="removeTail"
          />
        </div>
        <div className={styles.grid}>
          <Input
            placeholder="Введите индекс"
            type="number"
            name="index"
            data-cy="index"
          />
          <Button
            extraClass={styles.double}
            text="Добавить по индексу"
            type="submit"
            onClick={addByIndex}
            isLoader={isAddedByIndex}
            data-cy="addIndex"
            disabled={isDisabled}
          />
          <Button
            extraClass={styles.double}
            text="Удалить по индексу"
            type="submit"
            onClick={() => setInsertMode(InsertModes.Remove)}
            isLoader={isRemovedByIndex}
            data-cy="removeIndex"
            disabled={isDisabled}
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
