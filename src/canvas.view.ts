import { Environment } from './environment';
import { Organism } from './organism';

export class CanvasView {
  constructor(id: string) {
    this.canvasElement = document.getElementById(id) as HTMLCanvasElement;
    const { width, height } = this.canvasElement;

    this.canvasElement.style.width = `${width}px`;
    this.canvasElement.style.height = `${height}px`;
    this.canvasElement.width = this.width = width * window.devicePixelRatio;
    this.canvasElement.height = this.height = height * window.devicePixelRatio;
    this.context = this.canvasElement.getContext('2d');
  }

  public canvasElement: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public width: number;
  public height: number;

  private environment: Environment;

  public setEnvironment(environment: Environment): void {
    this.environment = environment;
  }

  public live(): void {
    requestAnimationFrame(this.frame.bind(this));
  }

  private frame(): void {
    const { organisms } = this.environment.getSnapshot(0);

    this.clear();
    this.drawOrganism(organisms);

    requestAnimationFrame(this.frame.bind(this));
  }

  private clear(): void {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  private drawOrganism(organisms: Array<Organism>): void {
    const length = organisms.length;

    for (let i = 0; i < length; i += 1) {
      const [x, y] = organisms[i].coordinates;

      this.context.fillRect(x, y, 3, 3);
    }
  }
}
