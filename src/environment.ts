import { Resource } from './resource';
import { Organism } from './organism';
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

  private readonly resources: Array<Resource>;  // TODO: Get rid of inspection notification
  private readonly organisms: Array<Organism>;
  private coordinates: Set<string>;

  // TODO: Add resource rareness logic (chance not to get some resources)
  // TODO: improve resource distribution logic
  public getSomeResources(): Array<Resource> {
    return this.resources.map((resource: Resource) => resource.getPortion());
  }

  public getSnapshot(timePassedMs: number): ISnapshot {
    return { organisms: this.organisms };
  }

  private initCoordinates(): void {
    this.coordinates = new Set();
    const length = this.organisms.length;

    for (let i = 0; i < length; i += 1) {
      let newCoordinates;
      let x;
      let y;

      while (!newCoordinates || this.coordinates.has(newCoordinates)) {
        x = random(0, this.width);
        y = random(0, this.height);
        newCoordinates = `${x}:${y}`;
      }

      this.organisms[i].coordinates = [x, y];
      this.coordinates.add(newCoordinates);
    }
  }

  private static DEFAULT_PROPERTIES(): IEnvironmentSettings {
    return {
      width: 400,
      height: 400,
      resources: [],
      organisms: []
    };
  }
}

interface ICoordinatesMap { [key: string]: Array<Organism>; }

interface IEnvironmentSettings {
  width: number;
  height: number;
  resources: Array<Resource>;
  organisms: Array<Organism>;
}

export interface ISnapshot {
  organisms: Array<Organism>;
}
