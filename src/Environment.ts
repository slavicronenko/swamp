import {
  random,
  isFunction
} from './Helper';

export class Environment {
  constructor(givenSettings = Environment.DEFAULT_SETTINGS) {
    const settings = this.getCombinedSettings(givenSettings);

    this.resources = settings.resources;
  }

  private paused: boolean = true;
  private resources: IResource[];

  public live(): void {
    if (this.paused) {
      this.paused = false;
      requestAnimationFrame(this.animationStep.bind(this));
    }
  }

  public pause() {
    this.paused = true;
  }

  private animationStep(): void {
    if (this.paused) {
      return;
    }

    this.renewResources();
    requestAnimationFrame(this.animationStep.bind(this));
  }

  private renewResources(): void {
    this.resources.forEach((resource) => isFunction(resource.renew) && resource.renew(this));
  }

  private getCombinedSettings(givenSettings: object): IEnvironmentSettings {
    return Object.assign({}, Environment.DEFAULT_SETTINGS, givenSettings);
  }

  public static get DEFAULT_SETTINGS(): IEnvironmentSettings {
    return {
      resources: [{
        name: 'food',
        minFraction: 0,
        maxFraction: 3,
        getSome() {
          return random(this.minFraction, this.maxFraction, 1);
        },
        renew(environment: Environment) {
          // console.log(environment);
        }
      }]
    };
  }
}

export interface IEnvironmentSettings {
  resources: IResource[];
}

export interface IResource {
  name: string;
  minFraction: number;
  maxFraction: number;
  getSome(): number;
  amount?: null | number;
  renew?(environment: Environment): void;
}
