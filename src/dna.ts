import { Gene } from './gene';

// TODO: add mutation logic
export class Dna {
  constructor(genes: Gene[] = Dna.DEFAULT_GENES, code?: ICode) {
    this.genes = genes;
    this.code = code || this.encode();
  }

  private readonly code: ICode;
  private readonly genes: Gene[];

  public encode(): ICode {
    return this.genes.reduce((code, gene) => Object.assign(code, { [gene.name]: gene.generateValue() }), {});
  }

  public getCode(): ICode {
    return Object.assign({}, this.code);
  }

  public clone() {
    return new Dna(this.genes.slice(), Object.assign({}, this.code));
  }

  private static get DEFAULT_GENES(): Gene[] {
    return [
      new Gene({
        name: 'mitosisProbability',
        minValue: 0.01,
        maxValue: 1.75,
        precision: 2
      }),
      new Gene({
        name: 'degradation',
        minValue: 0.05,
        maxValue: 0.5,
        precision: 2
      }),
      new Gene({
        name: 'metabolism',
        minValue: 0.1,
        maxValue: 0.5,
        precision: 2
      })
    ];
  }
}

interface ICode {
  [id: string]: number;
}
