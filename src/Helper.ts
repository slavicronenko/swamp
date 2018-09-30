export function random(
  givenMin: number = 0,
  givenMax: number = Number.MAX_SAFE_INTEGER,
  precision: number = 0
): number {
  const multiplier = Math.pow(10, precision);
  const min = givenMin * multiplier;
  const max = givenMax * multiplier;

  return (Math.floor(Math.random() * (max - min)) + min) / multiplier;
}

export function isFunction(entity: any) {
  return typeof entity === 'function';
}
