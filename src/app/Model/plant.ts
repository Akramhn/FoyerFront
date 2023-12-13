import { Exercice } from "./exercice";

export class Plant {
    idPlant!: number;
    nomPlant!: string;
    startPlant!: Date;
    endPlant!: Date;
    listExercices!: number[]; // Assuming the listExercices contains IDs
    exercices!: Exercice[];
}
