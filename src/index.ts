import './style';
import { Environment } from './environment';
import { Resource } from './resource';
import { Organism } from './organism';
import { random } from './helper';
import { CanvasView } from './view/canvas.view';

const NUMBER_OF_ORGANISMS = 100;

const resources = [
  new Resource({
    name: 'food',
    minPortion: 0,
    maxPortion: 3,
    precision: 1
  })
];
const organisms = Array(NUMBER_OF_ORGANISMS)
  .fill(null)
  .map(() => {
    const startingResources = resources.map((resource) =>
      resource.clone({ amount: random(5, 10) })
    );

    return new Organism(startingResources);
  });

const env = new Environment({
  resources,
  organisms
});
const view = new CanvasView('view', env);

view.live();
(window as any).env = env;
