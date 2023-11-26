import { Etudiant } from "./etudiant";

export class Reservation {
       idReservation!:number ;
      anneeUnivirsitaire!: Date ;
      estValide!:boolean;
      etudiants !: Etudiant[]; 
}
