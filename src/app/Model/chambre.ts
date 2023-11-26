import { Bloc } from './bloc';
import { TypeChambre } from './enums/type-chambre';
import { Reservation } from './reservation';

export class Chambre {
  idChambre!: number;
  numeroChambre!: number;
  typeC!: TypeChambre;
  bloc !: Bloc;
  reservation !: Reservation[];
}
