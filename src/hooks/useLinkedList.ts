import { useState, useEffect, useCallback } from 'react';

class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export function useLinkedList() {
  const [head, setHead] = useState<Node<string> | null>(null);
  const [tail, setTail] = useState<Node<string> | null>(null);
  const [listArray, setListArray] = useState<string[]>([]);

  const append = (value: string) => {
    const newNode = new Node(value);

    if (!head) {
      setHead(newNode);
      setTail(newNode);
    } else {
      if (tail) {
        tail.next = newNode;
      }
      setTail(newNode);
    }
  };

  const prepend = (value: string) => {
    const newNode = new Node(value);

    if (!head) {
      setHead(newNode);
      setTail(newNode);
    } else {
      newNode.next = head;
      setHead(newNode);
    }
  };

  const insertAtIndex = useCallback(
    (index: number, value: string) => {
      if (index <= 0) {
        prepend(value);
        return;
      }

      const newNode = new Node(value);
      let currentNode = head;
      let currentIndex = 0;

      while (currentNode && currentIndex < index - 1) {
        currentNode = currentNode.next;
        currentIndex++;
      }

      if (!currentNode) return;

      newNode.next = currentNode.next;
      currentNode.next = newNode;

      if (!newNode.next) {
        setTail(newNode);
      }

      updateArray();
    },
    [head]
  );

  const deleteAtIndex = useCallback(
    (index: number) => {
      if (!head || index < 0) return;

      if (index === 0) {
        setHead(head.next);
        return;
      }

      let currentNode = head;
      let currentIndex = 0;

      while (currentNode.next && currentIndex < index - 1) {
        currentNode = currentNode.next;
        currentIndex++;
      }

      if (!currentNode.next) return;

      currentNode.next = currentNode.next.next;

      if (!currentNode.next) {
        setTail(currentNode);
      }
      updateArray();
    },
    [head]
  );

  const updateArray = () => {
    const values: string[] = [];
    let currentNode = head;
    while (currentNode) {
      values.push(currentNode.value);
      currentNode = currentNode.next;
    }
    setListArray(values);
  };

  const deleteFromHead = () => {
    if (!head) return;

    setHead(head.next);

    if (!head.next) {
      setTail(null);
    }
  };

  const deleteFromTail = () => {
    if (!head) return;

    if (!head.next) {
      setHead(null);
      setTail(null);
      return;
    }

    let currentNode = head;
    while (currentNode.next && currentNode.next.next) {
      currentNode = currentNode.next;
    }

    currentNode.next = null;
    setTail(currentNode);
  };

  useEffect(() => {
    updateArray();
  }, [head, tail, insertAtIndex, deleteAtIndex]);

  return {
    append,
    prepend,
    insertAtIndex,
    deleteAtIndex,
    deleteFromHead,
    deleteFromTail,
    listArray,
  };
}
