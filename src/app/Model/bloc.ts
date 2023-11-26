import { Foyer } from "./foyer";
import { Chambre } from './chambre';

export class Bloc {
  idBloc!: number;
  nomBloc!: string;
  capaciteBloc!: number;
  foyer!:Foyer;
  Chambre!:Chambre[];
}
