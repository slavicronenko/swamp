import { IDrawable } from '../interfaces';
import { getRandomColor, noop, random } from '../helper';

export class OrganismView implements IDrawable {
  constructor(x: number, y: number) {
    this.color = getRandomColor();
    this.x = x;
    this.y = y;
    this.width = 3;
    this.height = 3;
  }

  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public color: string;

  public updatePosition(maxX: number, maxY: number) {
    const maxStepIndex = OrganismView.STEPS.length - 1;
    const step = random(0, maxStepIndex);

    OrganismView.STEPS[step](this);

    if (this.x < 0 || this.x > maxX) {
      this.x = this.x + (maxX * (this.x < 0 ? 1 : -1));
    }

    if (this.y < 0 || this.y > maxY) {
      this.y = this.y + (maxY * (this.y < 0 ? 1 : -1));
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    const originalColor = context.fillStyle;

    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.fillStyle = originalColor;
  }

  private static get STEPS(): Array<(organismView: OrganismView) => void> {
    return [
      noop,
      (organismView: OrganismView) => organismView.y -= 1,
      (organismView: OrganismView) => organismView.x += 1,
      (organismView: OrganismView) => organismView.y += 1,
      (organismView: OrganismView) => organismView.x -= 1,
    ];
  }
}
