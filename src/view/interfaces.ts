import { Organism } from '../lib/organism';

export interface IDrawable {
  draw(context: CanvasRenderingContext2D): void;
  updatePosition?(maxX: number, maxY: number): void;
}

export type EventHandler = (...params: Array<any>) => any;

export type ActualOrganism = Organism & {
  size: number;
  color: string;
};
