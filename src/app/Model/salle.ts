import { Coach } from "./coach";

export class Salle {
    idSalle!: number;
    name!: string;
    location!: string; // Use camelCase for consistency with Angular conventions
    capacity!: number;
    image!: Blob;
    coaches!: Coach[]; // Assuming you have a Coach model/interface
    idCoach!: number[]; // Adj
}
