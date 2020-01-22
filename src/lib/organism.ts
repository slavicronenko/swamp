import { Dna } from './dna';

export class Organism  {
  constructor(private readonly dna: Dna) {
    Object.assign(this, dna.getCode());
  }
}
