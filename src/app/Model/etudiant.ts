import { Reservation } from "./reservation";

export class Etudiant {
      idEtudiant!:number ;
      nomEt !:string ;
      prenomEt !:string ;
      cin  !:number ;
      ecole !:string ;

      dateNaissance !:Date;

    
     reservations !:Reservation[];
}
