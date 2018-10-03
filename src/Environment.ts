import { Resource } from './Resource';
import { Bacterium } from './Bacterium';

export class Environment {
  constructor(settings: IEnvironmentSettings) {
    Object.assign(this, settings);
  }

  private paused: boolean = true;
  private readonly resources: Resource[];
  private readonly organisms: Bacterium[];

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

    requestAnimationFrame(this.animationStep.bind(this));
  }
}

interface IEnvironmentSettings {
  resources: Resource[];
  organisms: Bacterium[];
}
