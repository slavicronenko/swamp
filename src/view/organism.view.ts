import { Organism } from '../organism';
import { IDrawable } from '../interfaces';

export class OrganismView implements IDrawable {
  constructor(organism: Organism, x: number, y: number) {
    this.color = '#00ff00';
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

  public draw(context: CanvasRenderingContext2D): void {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
