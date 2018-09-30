export function random(min: number = 0, max: number = Number.MAX_SAFE_INTEGER, precision: number = 0): number {
  return +(Math.random() * (max - min) + min).toFixed(precision);
}

export function isFunction(entity: any) {
  return typeof entity === 'function';
}
