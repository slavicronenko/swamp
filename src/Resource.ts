import { generateString, isNumber, random } from './Helper';

export class Resource {
  constructor(settings: IResourceSettings = Resource.GENERATE_SETTINGS()) {
    Object.assign(this, settings);
    this.initialSettings = Object.assign({}, settings);
  }

  public readonly type: string;

  private readonly initialSettings: IResourceSettings;
  private readonly minPortion: number | null;
  private readonly maxPortion: number | null;
  private readonly precision: number = 0;
  private amount: number = Number.POSITIVE_INFINITY;

  private getPortion(): Resource {
    const {
      type,
      amount,
      precision,
      minPortion,
      maxPortion
    } = this;

    let portion = isNumber(minPortion) && isNumber(maxPortion)
      ? random(minPortion, maxPortion, precision)
      : amount;

    if (portion > amount) {
      portion = amount;
    }

    this.amount = amount - portion;

    return new Resource({
      type,
      precision,
      minPortion,
      maxPortion,
      amount: portion
    });
  }

  public merge(...resources: Resource[]): Resource {
    resources.forEach((resource: Resource) => {
      if (this.type === resource.type) {
        this.amount += resource.amount;
        resource.amount = 0;
      }
    });

    return this;
  }

  public toSettings(): IResourceSettings {
    return Object.assign({}, this.initialSettings);
  }

  private static GENERATE_SETTINGS(): IResourceSettings {
    const precision = random(0, 2);

    return {
      type: generateString(),
      precision,
      minPortion: random(0, 1, precision),
      maxPortion: random(1, 3, precision)
    };
  }
}

interface IResourceSettings {
  type: string;
  amount?: number;
  minPortion?: number;
  maxPortion?: number;
  precision?: number;
}
