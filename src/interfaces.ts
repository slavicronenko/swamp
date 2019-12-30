import { Resource } from './resource';
import { Organism } from './organism';

export interface IView {
  live(): void;
}

export interface IEnvironment {
  getSnapshot(timePassedMs: number): ISnapshot;
}

export interface IEnvironmentSettings {
  resources: Array<Resource>;
  organisms: Array<Organism>;
}

export interface ISnapshot {
  organisms: Array<Organism>;
}

export interface IDrawable {
  draw(context: CanvasRenderingContext2D): void;
}
