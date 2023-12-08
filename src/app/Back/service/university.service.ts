import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Foyer } from 'src/app/Model/foyer';
import { Universite } from 'src/app/Model/universite';

@Injectable({
  providedIn: 'root',
})
export class UniversityService {
  URL = 'http://localhost:9090/universite';

  constructor(private http: HttpClient) {}
  



  getUniversites() {
    return this.http.get<Universite[]>(`${this.URL}`);
  }
  getUniversite(id: number) {
    return this.http.get<Universite>(`${this.URL}/${id}`);
  }

  addUniversiteWithImage(universite: Universite, image: File): Observable<any> {
    if (this.depasseLimiteMots(universite.description, 140)) {
      // Gérez la logique en cas de dépassement de la limite
      return throwError("La description dépasse la limite de 140 mots.");
    }

    const formData = new FormData();
    formData.append('nomUni', universite.nomUniversite);
    formData.append('adresse', universite.adresse);
    formData.append('desc', universite.description);
    formData.append('image', image);

    console.log(image);
    console.log(universite);

    return this.http.post<any>(`${this.URL}`, formData)
      .pipe(
        catchError(error => {
          // Gérez les erreurs ici si nécessaire
          return throwError(error);
        })
      );
  }

  private depasseLimiteMots(description: string, limite: number): boolean {
    const mots = description.split(/\s+/).length;
    return mots > limite;
  }
  
  


  
  

  deleteUniversite(id: number) {
   return this.http.delete<Universite>(`${this.URL}/${id}`);
  }


  addUniversite(u: Universite) {
    return this.http.post<Universite>(`${this.URL}`, u);
  }
  // updateUniversite(u: Universite, id: number) {
  //   this.http.put<Universite[]>(`${URL}/${id}`, u);
  // }
}
