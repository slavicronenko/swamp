import { Environment } from './environment';
import { Bacterium } from './bacterium';

export class View {
  constructor(id: string) {
    this.canvasElement = document.getElementById(id) as HTMLCanvasElement;
    this.context = this.canvasElement.getContext('2d');
    this.width = this.canvasElement.width;
    this.height = this.canvasElement.height;
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
    const { bacteria } = this.environment.getSnapshot(0);

    this.clear();
    this.drawBacteria(bacteria);

    requestAnimationFrame(this.frame.bind(this));
  }

  private clear(): void {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  private drawBacteria(bacteria: Bacterium[]): void {
    const length = bacteria.length;

    for (let i = 0; i < length; i += 1) {
      const [x, y] = bacteria[i].coordinates;

      this.context.fillRect(x, y, 1, 1);
    }
  }
}
