import { Bloc } from './bloc';
import { Universite } from './universite';
export class Foyer {
  idFoyer!: number;
  nomFoyer!: string;
  capaciteFoyer!: number;
  blocs!: Bloc[];
  universite!: Universite;
}
