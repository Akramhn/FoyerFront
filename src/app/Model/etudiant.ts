import { Reservation } from "./reservation";
import { Universite } from "./universite";
import { User } from "./user.model";

export class Etudiant extends User {
      cin!: number;
      universite!: Universite;
      dateNaissance!: Date;
      reservations !:Reservation[];
}
