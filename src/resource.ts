import { getRandomString, isNumber, random } from './helper';

export class Resource {
  constructor(settings: IResourceSettings = Resource.GENERATE_SETTINGS()) {
    Object.assign(this, settings);
    this.initialSettings = Object.assign({}, settings);
  }

  public readonly name: string;

  public coordinates: Array<number>;

  private readonly initialSettings: IResourceSettings;
  private readonly minPortion: number | null;
  private readonly maxPortion: number | null;
  private readonly precision: number = 0;
  private amount: number = Number.POSITIVE_INFINITY;

  public getPortion(): Resource {
    const {
      name,
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
      name,
      precision,
      minPortion,
      maxPortion,
      amount: portion
    });
  }

  public merge(...resources: Array<Resource>): Resource {
    resources.forEach((resource: Resource) => {
      if (this.name === resource.name) {
        this.amount += resource.amount;
        resource.amount = 0;
      }
    });

    return this;
  }

  public spend(amountToSpend: number): boolean {
    const amount = this.amount - amountToSpend;
    const isNotDepleted = amount > 0;

    this.amount = isNotDepleted ? amount : 0;

    return isNotDepleted;
  }

  public clone(settings: IResourcePartialSettings = {}): Resource {
    return new Resource(Object.assign({}, this.initialSettings, settings));
  }

  private static GENERATE_SETTINGS(): IResourceSettings {
    const precision = random(0, 2);

    return {
      name: getRandomString(),
      precision,
      minPortion: random(0, 1, precision),
      maxPortion: random(1, 3, precision)
    };
  }
}

interface IResourceSettings {
  name: string;
  amount?: number;
  minPortion?: number;
  maxPortion?: number;
  precision?: number;
}

interface IResourcePartialSettings {
  name?: string;
  amount?: number;
  minPortion?: number;
  maxPortion?: number;
  precision?: number;
}
