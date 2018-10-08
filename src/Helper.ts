export function random(min: number = 0, max: number = Number.MAX_SAFE_INTEGER, precision: number = 0): number {
  return +(Math.random() * (max - min) + min).toFixed(precision);
}

export function generateString(size: number = 6, chars: string = 'abcdefghijklmnopqrstuvwxyz'): string {
  return Array(size)
    .fill(null)
    .map(() => chars[random(0, chars.length - 1)])
    .join('');
}

export function isFunction(entity: any) {
  return typeof entity === 'function';
}

export function isUndefined(entity: any) {
  return typeof entity === 'undefined';
}

export function isNumber(entity: any) {
  return typeof entity === 'number';
}

export function safeFloat(num: number): number {
  return parseFloat(num.toPrecision(12));
}

export function chance(chancePercent: number = 50, precision: number = 0): boolean {
  return random(0, 100, precision) < chancePercent;
}

function getNumberOfSubstrings(str: string, subStrs: string[]): { [id: string]: number } {
  const result = {};
  const strLength = str.length;

  for (let letterPosition = 0; letterPosition < strLength; letterPosition += 1) {
    for (const subStr of subStrs) {
      const subStrLength = subStr.length;

      if (str.slice(letterPosition, letterPosition + subStrLength) === subStr) {
        result[subStr] = isUndefined(result[subStr]) ? 1 : result[subStr] + 1;
      }
    }
  }

  return result;
}
