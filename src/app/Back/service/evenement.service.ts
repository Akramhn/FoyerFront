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
  getEvenement(id: number) {
    return this.http.get<Evenement[]>(`${this.data}/${id}`);
  }
  deleteEvenement(id: number): Observable<any> {
    return this.http.delete(`${this.data}/${id}`);
  }
  addEvenement(c: Evenement): Observable<any> {
    return this.http.post(`${this.data}`, c);
  }
}
