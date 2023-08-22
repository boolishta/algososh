export function createIndexArray(n: number): number[] {
  const numberArray: number[] = [];

  if (n <= 0) return [];

  for (let i = 0; i <= n; i++) {
    numberArray.push(i);
  }

  return numberArray;
}
