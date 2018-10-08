import { Resource } from './Resource';
import { DNA } from './DNA';

export class Bacterium {
  constructor(resources: Resource[], dna: DNA = new DNA()) {
    const {
      a,
      z,
      g: initialMass,
    } = dna.getGenes(); // TODO: this logic should be unified and encapsulated in some method
    this.resources = resources;
    this.dna = dna;

    Object.assign(this, {
      initialMass,
      metabolismRatio: a + (z / 2)
    });
  }

  private readonly resources: Resource[];
  private readonly dna: DNA;
  private readonly initialMass: number; // TODO: improve calculation logic
  private readonly metabolismRatio: number; // TODO: find some elegant approach

  // TODO: Find some better name for this method and refactor it
  public lifeCycleIteration(resources: Resource[]): IBacteriumOutput {
    let currentMass = 0;
    let isAlive = true;
    const children = [];

    for (const ownResource of this.resources) {
      const sameResource = resources.find((resource) => resource.name === ownResource.name);

      if (sameResource) {
        ownResource.merge(sameResource);
      }

      isAlive = ownResource.spend(this.metabolismRatio);

      if (!isAlive) {
        break;
      }

      currentMass += ownResource.getAmount();
    }

    if (currentMass > this.initialMass * 2) { // TODO: find better condition
      isAlive = false;
      children.push(...this.mitosis());
    }

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
