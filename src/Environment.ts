import {
  isFunction
} from './Helper';
import { Resource } from './Resource';

export class Environment {
  constructor(givenSettings = Environment.DEFAULT_SETTINGS) {
    const settings = this.getCombinedSettings(givenSettings);

    this.resources = settings.resources;
  }

  private paused: boolean = true;
  private resources: Resource[];

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
      resources: [
        new Resource({
          type: 'food',
          minPortion: 0,
          maxPortion: 3,
          precision: 1
        })
      ]
    };
  }
}

export interface IEnvironmentSettings {
  resources: Resource[];
}
