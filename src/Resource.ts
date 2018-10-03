import { generateString, isNumber, random } from './Helper';

export class Resource {
  constructor(settings: IResourceSettings = Resource.GENERATE_SETTINGS()) {
    Object.assign(this, settings);
  }

  private readonly type: string;
  private readonly minPortion: number | null;
  private readonly maxPortion: number | null;
  private readonly precision: number = 0;
  private amount: number = Number.POSITIVE_INFINITY;

  private getPortion(): Resource {
    const {
      type,
      amount: initialAmount,
      precision,
      minPortion,
      maxPortion
    } = this;

    let amount = isNumber(minPortion) && isNumber(maxPortion)
      ? random(minPortion, maxPortion, precision)
      : initialAmount;

    if (amount > initialAmount) {
      amount = initialAmount;
    }

    this.amount = initialAmount - amount;

    return new Resource({
      type,
      amount,
      precision,
      minPortion,
      maxPortion
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

  private static GENERATE_SETTINGS() {
    const precision = random(0, 2);

    return {
      type: generateString(),
      precision,
      minPortion: random(0, 1, precision),
      maxPortion: random(1, 3, precision)
    };
  }
}

export interface IResourceSettings {
  type: string;
  amount?: number;
  minPortion?: number;
  maxPortion?: number;
  precision?: number;
}
