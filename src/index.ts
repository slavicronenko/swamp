import { Environment } from './Environment';
import { Resource } from './Resource';
import { Bacterium } from './Bacterium';
import { random } from './Helper';

const NUMBER_OF_BACTERIA = 100;

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

    return new Bacterium(startingResources);
  });


const env = new Environment({
  resources,
  bacteria
});

env.live();
(window as any).env = env;
