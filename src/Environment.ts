import { Resource } from './Resource';
import { Bacterium } from './Bacterium';

export class Environment { // TODO: ADD CAPACITY PROPERTY AND RESOURCE DISTRIBUTION LOGIC
  constructor(settings: IEnvironmentSettings) {
    Object.assign(this, settings);
  }

  private paused: boolean = true;
  private readonly resources: Resource[];  // TODO: Get rid of inspection notification
  private readonly bacteria: Bacterium[];

  public live(): void {
    if (this.paused) {
      this.paused = false;
      requestAnimationFrame(this.nextIteration.bind(this));
    }
  }

  public pause() {
    this.paused = true;
  }

  // TODO: Add resource rareness logic (chance not to get some resources)
  // TODO: improve resource distribution logic
  public getSomeResources(): Resource[] {
    return this.resources.map((resource: Resource) => resource.getPortion());
  }

  private nextIteration(): void {
    if (this.paused) {
      return;
    }

    // Can't use filter here, we need the same array, not a new one
    for (let i = 0; i < this.bacteria.length; i += 1) {
      const {
        isAlive,
        children
      } = this.bacteria[i].lifeCycleIteration(this.getSomeResources());

      if (!isAlive) {
        this.bacteria.splice(i, 1);

        i -= 1;
      }

      if (children.length) {
        this.bacteria.push(...children);
      }
    }

    console.log(this.bacteria.length);

    if (this.bacteria.length > 0) {
      requestAnimationFrame(this.nextIteration.bind(this));
    }
  }
}

interface IEnvironmentSettings {
  resources: Resource[];
  bacteria: Bacterium[];
}
