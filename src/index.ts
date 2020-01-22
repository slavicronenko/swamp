import './style';
import { Environment } from './lib/environment';
import { Organism } from './lib/organism';
import { CanvasView } from './view/canvas.view';
import { Gene } from './lib/gene';
import { Dna } from './lib/dna';

const fps = document.getElementById('fps');
const NUMBER_OF_ORGANISMS = 100;

const genes = [
  new Gene({
    name: 'size',
    minValue: 1,
    maxValue: 3
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
