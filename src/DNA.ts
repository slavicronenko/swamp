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

  public clone() {
    return new DNA(this.code);  // TODO: might cause performance issues due to recalculation genes
  }

  private static get USEFUL_GENES(): string[] {
    return [
      'a',
      'g',
      'z'
    ];
  }

  private static get DEFAULT_CHARS(): string {
    return 'abcdefghijklmnopqrstuvwxyz';
  }

  private static get DEFAULT_LENGTH(): number {
    return 130;
  }
}

interface IGenes {
  [index: string]: number;
}
