import { random } from './Helper';

export class Gene {
  constructor(settings: IGeneSettings) {
    Object.assign(this, Gene.DEFAULT_SETTINGS, settings);
  }

  public readonly name: string;
  public readonly minValue: number;
  public readonly maxValue: number;
  public readonly precision: number;

  public generateValue(): number {
    return random(this.minValue, this.maxValue, this.precision);
  }

  private static get DEFAULT_SETTINGS() {
    return {
      precision: 0
    };
  }
}

interface IGeneSettings {
  name: string;
  minValue: number;
  maxValue: number;
  precision?: number;
}
