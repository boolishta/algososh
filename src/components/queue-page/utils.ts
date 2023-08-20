interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error('Maximum length exceeded');
    }

    this.container[this.tail] = item;
    this.tail = (this.tail + 1) % this.size;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }

    this.container[this.head] = null;
    this.head = (this.head + 1) % this.size;
    this.length--;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }
    return this.container[this.head];
  };

  isEmpty = () => this.length === 0;

  toArray = () => [...this.container];

  reset = () => {
    this.container = Array(this.size);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };

  headIndex = () => (this.length ? this.head : null);

  tailIndex = () => {
    if (this.length === 0) return null;
    if (this.tail === 0) return this.size - 1;
    return this.tail - 1;
  };

  full = () => this.length >= this.size;
}
