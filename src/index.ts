import { Environment } from './Environment';
import { Resource } from './Resource';
import { Bacterium } from './Bacterium';
import { random } from './Helper';

const NUMBER_OF_BACTERIA = 100;

const resources = [
  new Resource({
    type: 'food',
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
      ration: resources.map(({ type }: Resource) => type),
      resources: startingResources
    });
  });


const env = new Environment({
  resources,
  bacteria
});

env.live();
(window as any).env = env;
