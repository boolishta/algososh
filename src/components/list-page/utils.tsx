import { LList } from './type';

class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList<T> implements LList<T> {
  head: LinkedListNode<T> | null;
  tail: LinkedListNode<T> | null;

  constructor(values?: T[]) {
    this.head = null;
    this.tail = null;

    if (values && values.length > 0) {
      for (const value of values) {
        this.append(value);
      }
    }
  }

  prepend(value: T): void {
    const newNode = new LinkedListNode(value);
    newNode.next = this.head;
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
  }

  append(value: T): void {
    const newNode = new LinkedListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    if (this.tail) {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  addByIndex(index: number, value: T): void {
    if (index === 0) {
      this.prepend(value);
      return;
    }

    const newNode = new LinkedListNode(value);
    let current = this.head;
    let prev = null;
    let i = 0;

    while (current && i < index) {
      prev = current;
      current = current.next;
      i++;
    }

    if (!current) {
      return;
    }

    newNode.next = current;
    if (prev) {
      prev.next = newNode;
    }

    if (current === this.head) {
      this.head = newNode;
    }
  }

  deleteByIndex(index: number): void {
    if (!this.head || index < 0) {
      return;
    }

    if (index === 0) {
      this.head = this.head.next;
      if (!this.head) {
        this.tail = null;
      }
      return;
    }

    let current: LinkedListNode<T> | null = this.head;
    let prev = null;
    let i = 0;

    while (current && i < index) {
      prev = current;
      current = current.next;
      i++;
    }

    if (!current) {
      return;
    }

    if (prev) {
      prev.next = current.next;
      if (current === this.tail) {
        this.tail = prev;
      }
    }
  }

  deleteHead(): void {
    if (!this.head) {
      return;
    }

    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    }
  }

  deleteTail(): void {
    if (!this.tail) {
      return;
    }

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return;
    }

    let current = this.head;
    while (current?.next !== this.tail) {
      current = current?.next || null;
    }

    if (current) {
      current.next = null;
      this.tail = current;
    }
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}
