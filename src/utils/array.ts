export function createIndexArray(n: number): number[] {
  const numberArray: number[] = [];

  if (n <= 0) return [0];

  for (let i = 0; i <= n - 1; i++) {
    numberArray.push(i);
  }

  return numberArray;
}
