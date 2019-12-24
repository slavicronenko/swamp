import { Resource } from './resource';
import { Bacterium } from './bacterium';
import { random } from './helper';

export class Environment { // TODO: ADD CAPACITY PROPERTY AND RESOURCE DISTRIBUTION LOGIC
  constructor(settings: IEnvironmentSettings) {
    Object.assign(this, {
      ...Environment.DEFAULT_PROPERTIES,
      ...settings
    });

    this.initCoordinates();
  }

  public width: number;
  public height: number;

  private readonly resources: Resource[];  // TODO: Get rid of inspection notification
  private readonly bacteria: Bacterium[];
  private coordinates: Set<string>;

  // TODO: Add resource rareness logic (chance not to get some resources)
  // TODO: improve resource distribution logic
  public getSomeResources(): Resource[] {
    return this.resources.map((resource: Resource) => resource.getPortion());
  }

  public getSnapshot(timePassedMs: number): ISnapshot {
    return { bacteria: this.bacteria };
  }

  private initCoordinates(): void {
    this.coordinates = new Set();
    const length = this.bacteria.length;

    for (let i = 0; i < length; i += 1) {
      let newCoordinates;
      let x;
      let y;

      while (!newCoordinates || this.coordinates.has(newCoordinates)) {
        x = random(0, this.width);
        y = random(0, this.height);
        newCoordinates = `${x}:${y}`;
      }

      this.bacteria[i].coordinates = [x, y];
      this.coordinates.add(newCoordinates);
    }
  }

  private static DEFAULT_PROPERTIES(): IEnvironmentSettings {
    return {
      width: 400,
      height: 400,
      resources: [],
      bacteria: []
    };
  }
}

interface ICoordinatesMap { [key: string]: Bacterium[]; }

interface IEnvironmentSettings {
  width: number;
  height: number;
  resources: Resource[];
  bacteria: Bacterium[];
}

export interface ISnapshot {
  bacteria: Bacterium[];
}
