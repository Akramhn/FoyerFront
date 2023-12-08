import { Foyer } from './foyer';
export class Universite {
  idUniversite!: number;
  nomUniversite!: string;
  description!:string;
  adresse!: string;
  imageUrl!:Blob;
  foyer!: Foyer;
}
