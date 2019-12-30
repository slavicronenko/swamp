import { Organism } from './organism';
import { IEnvironment, IEnvironmentSettings } from './interfaces';

export class Environment implements IEnvironment {
  constructor(settings: IEnvironmentSettings) {
    Object.assign(this, {
      ...Environment.DEFAULT_PROPERTIES,
      ...settings
    });
  }

  private readonly organisms: Array<Organism>;

  public getSnapshot(timePassedMs: number): ISnapshot {
    return { organisms: this.organisms };
  }

  private static DEFAULT_PROPERTIES(): IEnvironmentSettings {
    return {
      resources: [],
      organisms: []
    };
  }
}

export interface ISnapshot {
  organisms: Array<Organism>;
}
