import { IDrawable, IEnvironment, IView } from '../interfaces';
import { OrganismView } from './organism.view';
import { random } from '../helper';

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

  public live(): void {
    requestAnimationFrame(this.frame.bind(this));
  }

  private frame(): void {
    const { organisms } = this.environment.getSnapshot(0);
    const items = [...organisms];
    const length = items.length;

    this.clear();

    for (let i = 0; i < length; i += 1) {
      let drawable = this.drawables.get(items[i]);

      if (!drawable) {
        const [x, y] = this.getRandomCoordinates();

        drawable = new OrganismView(items[i], x, y);
        this.drawables.set(items[i], drawable);
      }

      drawable.draw(this.context);
    }

    requestAnimationFrame(this.frame.bind(this));
  }

  private clear(): void {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  private getRandomCoordinates(): Array<number> {
    return [random(0, this.width), random(0, this.height)];
  }
}
