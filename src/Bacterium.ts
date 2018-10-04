import { Resource } from './Resource';

export class Bacterium {
  constructor(settings: IBacteriumSettings) {
    Object.assign(this, settings);
  }

  private resources: Resource[];
  private readonly ration: string[]; // TODO: Get rid of inspection notification
  private readonly metabolismRatio: number; // TODO: find some elegant approach

  // TODO: Find some better name for this method and refactor it
  public lifeCycleIteration(resources: Resource[]): boolean {
    return this.resources.reduce((isAlive, ownResource) => {
      const sameResource = resources.find((resource) => resource.type === ownResource.type);

      if (sameResource) {
        ownResource.merge(sameResource);
      }

      return isAlive && ownResource.spend(this.metabolismRatio);
    }, true);
  }
}

interface IBacteriumSettings {
  resources: Resource[];
  ration: string[];
  metabolismRatio: number;
}
