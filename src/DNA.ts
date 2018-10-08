import { countSubstrings, generateString } from './Helper';

export class DNA {
  constructor(code: string = generateString(DNA.DEFAULT_LENGTH, DNA.DEFAULT_CHARS)) {
    this.genes = countSubstrings(code, DNA.USEFUL_GENES);
  }

  private readonly code: string;
  private readonly genes: IGenes;

  public getCode(): string {
    return this.code;
  }

  public getGenes(): IGenes {
    return Object.assign({}, this.genes);
  }

  private static get USEFUL_GENES() {
    return [
      'm'
    ];
  }

  private static get DEFAULT_CHARS() {
    return 'abcdefghijklmnopqrstuvwxyz';
  }

  private static get DEFAULT_LENGTH() {
    return 130;
  }
}

interface IGenes {
  [index: string]: number;
}
