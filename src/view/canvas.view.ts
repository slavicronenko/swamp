import { EventHandler, IDrawable, IEnvironment, IView } from '../interfaces';
import { OrganismView } from './organism.view';
import { isFunction, random } from '../helper';

export class CanvasView implements IView  {
  constructor(id: string, environment: IEnvironment) {
    this.canvasElement = document.getElementById(id) as HTMLCanvasElement;
    const { width, height } = this.canvasElement;

    this.canvasElement.style.width = `${width}px`;
    this.canvasElement.style.height = `${height}px`;
    this.canvasElement.width = this.width = width * window.devicePixelRatio;
    this.canvasElement.height = this.height = height * window.devicePixelRatio;
    this.context = this.canvasElement.getContext('2d');
    this.environment = environment;
    this.drawables = new WeakMap();
  }

  public canvasElement: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public width: number;
  public height: number;

  private environment: IEnvironment;
  private drawables: WeakMap<any, IDrawable>;
  private lastUpdate: number;
  private eventMap: { [key: string]: Array<EventHandler> } = {};

  public live(): void {
    requestAnimationFrame(this.frame.bind(this));
  }

  private frame(): void {
    const timePassed = this.lastUpdate ? Date.now() - this.lastUpdate : 0;
    this.dispatchEvent('fps', (1000 / timePassed).toFixed(0));
    const { organisms } = this.environment.getSnapshot(timePassed);
    const items = [...organisms];
    const length = items.length;

    this.clear();

    for (let i = 0; i < length; i += 1) {
      let drawable = this.drawables.get(items[i]);

      if (!drawable) {
        const [x, y] = this.getRandomCoordinates();

        drawable = new OrganismView(x, y);
        this.drawables.set(items[i], drawable);
      }

      if (isFunction(drawable.updatePosition)) {
        drawable.updatePosition(this.width, this.height);
      }

      drawable.draw(this.context);
    }

    this.lastUpdate = Date.now();
    requestAnimationFrame(this.frame.bind(this));
  }

  public addEventListener(type: string, handler: EventHandler): void {
    if (!this.eventMap[type]) {
      this.eventMap[type] = [];
    }

    this.eventMap[type].push(handler);
  }

  public dispatchEvent(type: string, value?: any): void {
    this.eventMap[type].forEach(handler => handler(value));
  }

  private clear(): void {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  private getRandomCoordinates(): Array<number> {
    return [random(0, this.width), random(0, this.height)];
  }
}
