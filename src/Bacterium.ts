import { Resource } from './Resource';

export class Bacterium {
  constructor(settings: IBacteriumSettings) {
    Object.assign(this, settings, {
      initialMass: settings.resources.reduce((wholeMass, { amount }) => wholeMass + amount, 0)
    });

    for (const prop in Bacterium.PROPERTIES) {
      if (Bacterium.PROPERTIES.hasOwnProperty(prop)) {
        this[prop] = Bacterium.PROPERTIES[prop](settings.dna);
      }
    }
  }

  private resources: Resource[];
  private readonly dna: string;
  private readonly initialMass: number; // TODO: improve calculation logic
  private readonly ration: string[]; // TODO: Get rid of inspection notification
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
    return new Bacterium({
      ration: this.ration,
      metabolismRatio: this.metabolismRatio,
      resources: this.resources.map((resource) => resource.getPortion()), // TODO: improve logic
      dna: this.dna
    });
  }

  private static get PROPERTIES(): { [id: string]: (gene: string) => any; } {
    return {
      initialMass: (dna) => dna.charCodeAt(0) / 10
    };
  }
}

interface IBacteriumSettings {
  resources: Resource[];
  ration: string[];
  metabolismRatio: number;
  dna: string;
}

interface IBacteriumOutput {
  isAlive: boolean;
  children: Bacterium[];
}
