import { Environment } from './Environment';
import { Resource } from './Resource';
import { Bacterium } from './Bacterium';
import { generateString, random } from './Helper';

const NUMBER_OF_BACTERIA = 1;
const DNA_LENGTH = 128;

const resources = [
  new Resource({
    name: 'food',
    minPortion: 0,
    maxPortion: 3,
    precision: 1
  })
];
const bacteria = Array(NUMBER_OF_BACTERIA)
  .fill(null)
  .map(() => {
    const startingResources = resources.map((resource) =>
      resource.clone({ amount: random(5, 10) })
    );

    return new Bacterium({
      ration: resources.map(({ name }: Resource) => name),
      resources: startingResources,
      metabolismRatio: 1.5,
      dna: generateString(DNA_LENGTH)
    });
  });


const env = new Environment({
  resources,
  bacteria
});

env.live();
(window as any).env = env;
