export interface LList<T> {
  prepend: (value: T) => void;
  append: (value: T) => void;
  addByIndex: (index: number, value: T) => void;
  deleteByIndex: (index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  toArray: () => T[];
}

export enum InsertModes {
  Head = 'head',
  Tail = 'tail',
  Index = 'index',
  Remove = 'remove',
}
