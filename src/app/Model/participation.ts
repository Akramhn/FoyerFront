import { Etudiant } from "./etudiant";
import { Evenement } from "./evenement";
export class Participation {
    idParticipation!:number;
    dateParticipation!:Date;
    etudiant!: Etudiant;
    evenement!: Evenement;
}
