import './style';
import { Environment } from './environment';
import { Resource } from './resource';
import { Organism } from './organism';
import { random } from './helper';
import { CanvasView } from './view/canvas.view';

const fps = document.getElementById('fps');
const NUMBER_OF_ORGANISMS = 100;

const organisms = Array(NUMBER_OF_ORGANISMS)
  .fill(null)
  .map(() => new Organism());

const env = new Environment({ organisms });
const view = new CanvasView('view', env);

view.live();
(window as any).env = env;

view.addEventListener('fps', value => fps.innerText = `FPS: ${value}`);
