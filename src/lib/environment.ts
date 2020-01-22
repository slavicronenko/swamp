import { Organism } from './organism';

export class Environment {
  constructor(settings: IEnvironmentSettings) {
    Object.assign(this, {
      ...Environment.DEFAULT_PROPERTIES,
      ...settings
    });
  }

  private readonly organisms: Array<Organism>;

  public getSnapshot<T>(timePassedMs: number): ISnapshot<T> {
    return {
      organisms: this.organisms as unknown as Array<T>
    };
  }

  private static DEFAULT_PROPERTIES(): IEnvironmentSettings {
    return {
      organisms: []
    };
  }
}

export interface ISnapshot<T> {
  organisms: Array<T>;
}

export interface IEnvironmentSettings {
  organisms: Array<Organism>;
}
