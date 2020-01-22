import { Gene } from './gene';

export class Dna {
  constructor(private readonly genes: Array<Gene>, code?: ICode) {
    this.code = code || this.generateCode();
  }

  private readonly code: ICode;

  public generateCode(): ICode {
    return this.genes.reduce((code, gene) => Object.assign(code, { [gene.name]: gene.generateValue() }), {});
  }

  public getCode(): ICode {
    return { ...this.code };
  }

  public clone() {
    return new Dna(this.genes.slice(), { ...this.code });
  }

  public mutate(geneName: string): void {
    const gene = this.genes.find(({ name }) => name === geneName);

    this.code[geneName] = gene.mutate(this.code[geneName]);
  }
}

export interface ICode {
  [gene: string]: any;
}
