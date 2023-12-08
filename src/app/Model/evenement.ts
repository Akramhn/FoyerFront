import { Participation } from "./participation";
export class Evenement {
    idEvenement!:number ;
    nomEvenement!:String ;
    lieu!:String;
    dateEvenement!:Date;
    imageUrl!:Blob;
    description!:String;
    participation!:Participation[] ;
}
