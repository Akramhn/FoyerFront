import { Salle } from "./salle";

export class Coach {
  idCoach!: number;
  nomCoach!: string;
  prenomCoach!: string;
  experiance!: string;
  availability!: boolean;
  salle!: Salle; // Assuming you have a Salle model/interface
  salleId!: number;
}
