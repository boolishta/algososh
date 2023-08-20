export function fibonacci(number: number): number[] {
  const result = [1];
  if (number === 1) {
    return result;
  } else if (number === 2) {
    result.push(1);
    return result;
  } else {
    result.push(1);
    for (let i = 2; i < number; i++) {
      result.push(result[i - 1] + result[i - 2]);
    }
  }
  return result;
}
