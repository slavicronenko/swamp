import { Resource } from './resource';
import { Dna } from './dna';
import { chance } from './helper';

export class Bacterium {
  constructor(resources: Resource[], dna: Dna = new Dna()) {
    this.resources = resources;
    this.dna = dna;

    Object.assign(this, this.dna.getCode());
  }

  public coordinates?: number[];

  private readonly resources: Resource[];
  private readonly dna: Dna;
  private readonly mitosisProbability: number;
  private readonly degradation: number;
  private readonly metabolism: number;
  private age: number = 0;

  // TODO: Find some better name for this method and refactor it
  public lifeCycleIteration(resources: Resource[]): IBacteriumOutput {
    let isAlive = true;
    const children = [];
    const consumption = this.metabolism + this.age * this.degradation;

    for (const ownResource of this.resources) {
      const sameResource = resources.find((resource) => resource.name === ownResource.name);

      if (sameResource) {
        ownResource.merge(sameResource);
      }

      isAlive = ownResource.spend(consumption);

      if (!isAlive) {
        break;
      }
    }

    if (chance(this.mitosisProbability)) {
      isAlive = false;
      children.push(...this.mitosis());
    }

    this.age += 1;

    return {
      isAlive,
      children
    };
  }

  private mitosis(): Bacterium[] {
    return [
      this.getChild(),
      this.getChild()
    ];
  }

  private getChild(): Bacterium {
    const { resources, dna } = this;

    return new Bacterium(
      resources.map((resource) => resource.getPortion()), // TODO: improve logic
      dna.clone()
    );
  }
}

interface IBacteriumOutput {
  isAlive: boolean;
  children: Bacterium[];
}
