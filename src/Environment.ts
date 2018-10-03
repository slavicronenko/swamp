import { Resource } from './Resource';
import { Bacterium } from './Bacterium';

export class Environment {
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
  public getSomeResources(): Resource[] {
    return this.resources.map((resource: Resource) => resource.getPortion());
  }

  private nextIteration(): void {
    if (this.paused) {
      return;
    }

    // Can't use filter here, we need the same array, not a new one
    for (let i = 0; i < this.bacteria.length; i += 1) {
      const isCurrentBacteriaAlive = this.bacteria[i].lifeCycleIteration(this.getSomeResources());

      if (!isCurrentBacteriaAlive) {
        this.bacteria.splice(i, 1);

        i -= 1;
      }
    }

    requestAnimationFrame(this.nextIteration.bind(this));
  }
}

interface IEnvironmentSettings {
  resources: Resource[];
  bacteria: Bacterium[];
}
