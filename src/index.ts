import './style';
import { Environment } from './lib/environment';
import { Organism } from './lib/organism';
import { CanvasView } from './app/canvas.view';
import { Gene } from './lib/gene';
import { Dna } from './lib/dna';
import { getRandomColor } from './helper';

const fps = document.getElementById('fps');
const NUMBER_OF_ORGANISMS = 10000;

const genes = [
  new Gene({
    name: 'size',
    minValue: 1,
    maxValue: 3
  }),
  new Gene({
    name: 'step',
    minValue: 1,
    maxValue: 1.5,
    precision: 1
  }),
  new Gene({
    name: 'color',
    stable: true,
    generator: getRandomColor
  })
];

const organisms = Array(NUMBER_OF_ORGANISMS)
  .fill(null)
  .map(() => new Organism(new Dna(genes)));

const env = new Environment({ organisms });
const view = new CanvasView('view', env);

view.live();
(window as any).env = env;

view.addEventListener('fps', value => fps.innerText = `FPS: ${value}`);
