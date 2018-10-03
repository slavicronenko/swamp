import { Resource } from './Resource';

export class Bacterium {
  constructor(settings: IBacteriumSettings) {
    Object.assign(this, settings);
  }

  private ration: string[];
  private resources: Resource[];

  public eat(...resources: Resource[]): void {
    resources.forEach((resource: Resource) => this.canConsume(resource) && this.consume(resource));
  }

  private canConsume(resource: Resource): boolean {
    return this.ration.includes(resource.type);
  }

  private consume(givenResource: Resource): void {
    const sameResource = this.resources.find((ownResource) => ownResource.type === givenResource.type);

    if (sameResource) {
      sameResource.merge(givenResource);
    } else {
      this.resources.push(givenResource);
    }
  }
}

interface IBacteriumSettings {
  resources: Resource[];
  ration: string[];
}
