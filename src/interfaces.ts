import { Organism } from './organism';

export interface IView {
  live(): void;
}

export interface IEnvironment {
  getSnapshot(timePassedMs: number): ISnapshot;
}

export interface IEnvironmentSettings {
  organisms: Array<Organism>;
}

export interface ISnapshot {
  organisms: Array<Organism>;
}

export interface IDrawable {
  draw(context: CanvasRenderingContext2D): void;
  updatePosition?(maxX: number, maxY: number): void;
}

export type EventHandler = (...params: Array<any>) => any;
