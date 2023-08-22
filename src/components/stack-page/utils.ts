interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  toArray: () => T[];
  reset: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container.length > 0) {
      this.container.pop();
    }
  };

  peak = (): T | null => {
    if (this.container.length > 0) {
      return this.container[this.container.length - 1];
    }
    return null;
  };

  getSize = () => this.container.length;

  toArray = () => [...this.container];

  reset = () => {
    this.container = [];
  };
}
