import { Participation } from "./participation";
export class Evenement {
    idEvenement!:number ;
    nomEvenement!:String ;
    lieu!:String;
    dateEvenement!:Date;
    description!:String;
    participation!:Participation[] ;
}
