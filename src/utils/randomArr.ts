export const randomArr = (min: number, max: number) => {
  const array = [];
  const arrayLength = Math.floor(Math.random() * (max - min + 1)) + min;

  for (let i = 0; i < arrayLength; i++) {
    const randomValue = Math.floor(Math.random() * 101);
    array.push(randomValue);
  }

  return array;
};
