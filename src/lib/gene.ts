import { random } from '../helper';

export class Gene {
  constructor(settings: IGeneSettings) {
    Object.assign(this, Gene.DEFAULT_SETTINGS, settings);
  }

  public readonly name: string;
  public readonly stable: boolean;

  private readonly minValue: number;
  private readonly maxValue: number;
  private readonly precision: number;
  private readonly mutationThreshold: number;
  private readonly mutator?: Mutator<any>;

  public generateValue(): number {
    return random(this.minValue, this.maxValue, this.precision);
  }

  public mutate<V>(value: V): V {
    const mutator = this.mutator
      || Gene.MUTATORS[typeof value]
      || Gene.MUTATORS.default;

    return mutator(this, value);
  }

  private static get DEFAULT_SETTINGS(): Partial<IGeneSettings> {
    return {
      stable: false,
      minValue: 0,
      maxValue: Number.MAX_SAFE_INTEGER,
      precision: 0,
      mutationThreshold: 1
    };
  }

  private static numberMutator(gene: Gene, value: number): number {
    const { mutationThreshold, precision } = gene;
    let { minValue: min, maxValue: max } = gene;

    if (mutationThreshold) {
      min = value - mutationThreshold > min ? value - mutationThreshold : min;
      max = value + mutationThreshold < max ? value + mutationThreshold : max;
    }

    return random(min, max, precision);
  }

  private static stringMutator(gene: Gene, value: string): string {
    return value;
  }

  private static defaultMutator(gene: Gene, value: any): any {
    return value;
  }

  private static get MUTATORS(): { [type: string]: Mutator<any> } {
    return {
      string: Gene.stringMutator,
      number: Gene.numberMutator,
      default: Gene.defaultMutator
    };
  }
}

interface IGeneSettings {
  name: string;
  stable?: boolean;
  minValue?: number;
  maxValue?: number;
  precision?: number;
  mutationThreshold?: number;
  mutator?: Mutator<any>;
}

type Mutator<V> = (gene: Gene, value: V) => V;
