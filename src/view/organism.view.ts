import { ActualOrganism, IDrawable } from './interfaces';
import { getRandomColor, noop, random } from '../helper';

export class OrganismView implements IDrawable {
  constructor(
    organism: ActualOrganism,
    public x: number,
    public y: number
  ) {
    this.color = getRandomColor();
    this.size = organism.size;
  }

  public size: number;
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
    context.beginPath();
    context.arc(this.x, this.y, this.size / 2, 0, 2 * Math.PI);
    context.fill();
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
