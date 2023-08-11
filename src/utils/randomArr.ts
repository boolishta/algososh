const minLen = 3;
const maxLen = 17;

export const randomArr = () => {
  const array = [];
  const arrayLength =
    Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;

  for (let i = 0; i < arrayLength; i++) {
    const randomValue = Math.floor(Math.random() * 101);
    array.push(randomValue);
  }

  return array;
};
