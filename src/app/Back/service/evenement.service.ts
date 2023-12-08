import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evenement } from 'src/app/Model/evenement';
@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  data = 'http://localhost:9090/api/evenements';
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    }),
  };

  getEvenements() {
    return this.http.get<Evenement[]>(`${this.data}`);
  }
  updateEvenement(id: number, evenement: Evenement): Observable<Evenement> {
    return this.http.put<Evenement>(`${this.data}/${id}`, evenement);
  }
  getEvenementById(id: number): Observable<Evenement> {
    return this.http.get<Evenement>(`${this.data}/${id}`);
  }
  deleteEvenement(id: number): Observable<any> {
    return this.http.delete(`${this.data}/${id}`);
  }
  addEvenement(evenement: Evenement, image: File): Observable<any> {
    const formData = new FormData();

    formData.append('nomEvenement', evenement.nomEvenement.toString());
    formData.append('lieu', evenement.lieu.toString());
    const dateEvenement =
    evenement.dateEvenement instanceof Date
      ? evenement.dateEvenement.toLocaleDateString('en-US')  // Adjust the locale as needed
      : evenement.dateEvenement;
      
    formData.append('dateEvenement',dateEvenement);

    
    formData.append('image', image);
    formData.append('description', evenement.description.toString());
    console.log(evenement);
    console.log(image);

 
  
    return this.http.post<any>(`${this.data}`, formData );
    //return this.http.post(`${this.data}`, formData);
  }
}
