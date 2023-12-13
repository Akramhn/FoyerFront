import { CategoryEx } from "./category-ex";
import { Plant } from "./plant";

export class Exercice {
    idExercice!: number;
    nomExercice!: string;
    descriptionEx!: string;
    categoryEx!: CategoryEx;
    listPlantExercice!: Plant[];
    listPlantExercices!: number[];
}
