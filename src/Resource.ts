import { Environment } from './Environment';
import { generateString, isFunction, isNumber, random } from './Helper';

export class Resource {
  constructor(settings: IResourceSimpleSettings | IResourceComplexSettings = Resource.DEFAULT_SETTINGS) {
    const {
      type,
      amount,
      renew,
      getPortion,
      precision,
      minPortion,
      maxPortion
    } = settings;

    if (isFunction(getPortion)) {
      this.initComplexSettings(settings);
    } else {
      this.initSimpleSettings(settings);
    }

    this.type = type;
    this.amount = isNumber(amount) ? amount : null;
    this.renew = isFunction(renew) ? renew.bind(this) : null;
    this.getPortion = isFunction(getPortion)
      ? getPortion.bind(this)
      : this.defaultGetPortion.bind(this);

    if (isNumber(precision) && isNumber(minPortion) && isNumber(maxPortion)) {
      Object.assign(this, {precision, minPortion, maxPortion});
    } else {
      throw new Error('Some required parameters are missing!');
    }
  }

  private readonly type: string;
  private amount: number | null = null;
  private readonly minPortion: number;
  private readonly maxPortion: number;
  private readonly precision: number;

  public renew: (env: Environment) => void | null = null;
  public getPortion: (env?: Environment) => IPortion;

  private defaultGetPortion() {
    return random(this.minPortion, this.maxPortion, this.precision);
  }

  public static get DEFAULT_SETTINGS(): IResourceSimpleSettings {
    const precision = random(0, 2);

    return {
      type: generateString(),
      precision,
      minPortion: random(0, 1, precision),
      maxPortion: random(1, 3, precision),
    };
  }
}

export interface IPortion {
  type: string;
  amount: number;
}

export interface IResourceCommonSettings {
  type: string;
  amount?: number;
  renew?: (env: Environment) => void;
}

export interface IResourceSimpleSettings extends IResourceCommonSettings {
  minPortion: number;
  maxPortion: number;
  precision: number;
}

export interface IResourceComplexSettings extends IResourceCommonSettings {
  getPortion: (env?: Environment) => IPortion;
}



