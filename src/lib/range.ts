export class Range {
  constructor(public min: number, public max: number) {}

  public add(n: number): void {
    this.min += n;
    this.max += n;
  }

  public subtract(n: number): void {
    this.min -= n;
    this.max -= n;
  }

  public multiply(n: number): void {
    this.min *= n;
    this.max *= n;
  }

  public divide(n: number): void {
    this.min /= n;
    this.max /= n;
  }

  public includes(n: number): boolean {
    return this.min <= n && n <= this.max;
  }

  public reduce(n: number): number {
    let result = n;

    if (n < this.min) {
      result = this.max - (this.min - n) % this.length;
    } else if (n > this.max) {
      result = this.min + ((n - this.max) % this.length);
    }

    return result;
  }

  public get length(): number {
    return this.max - this.min;
  }

  public static getRange(min: number, max: number): Range {
    return new Range(min, max);
  }
}
