import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Foyer } from 'src/app/Model/foyer';
import { Universite } from 'src/app/Model/universite';

@Injectable({
  providedIn: 'root',
})
export class FoyerService {
  data = 'http://localhost:9090/foyer';
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    }),
  };
  getFoyers() {
    return this.http.get<Foyer[]>(`${this.data}`);
  }
  getFoyer(id: number) {
    return this.http.get<Foyer[]>(`${this.data}/${id}`);
  }
  deleteFoyer(id: number) {
    return this.http.delete<Foyer>(`${this.data}/${id}`);
  }
  addFoyer(f: Foyer) {
    return this.http.post<Foyer>(`${this.data}`, f);
  }
  getFoyerByUni(idU: number) {
    return this.http.get<Foyer>(`${this.data}/foyer/${idU}`);
  }

  addFoyerWithImage(foyer: Foyer, idUniversite: number, image: File): Observable<any> {
    const formDataWithImage = new FormData();
    formDataWithImage.append('nomFoyer', foyer.nomFoyer);
    formDataWithImage.append('capacite', foyer.capaciteFoyer.toString());
    formDataWithImage.append('image', image, image.name);

    console.log("FormData avec image:", formDataWithImage);

    return this.http.post<any>(`${this.data}/adduni/${idUniversite}`, formDataWithImage);
  }
}
