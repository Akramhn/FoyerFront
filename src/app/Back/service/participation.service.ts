import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participation } from 'src/app/Model/participation';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {
  data = 'http://localhost:9090/api/participations';
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    }),
  };

  getParticipations() {
    return this.http.get<Participation[]>(`${this.data}`);
  }
  getParticipation(id: number) {
    return this.http.get<Participation[]>(`${this.data}/${id}`);
  }
  deleteParticipation(id: number): Observable<any> {
    return this.http.delete(`${this.data}/${id}`);
  }
  addParticipation(idEvenement: number, idEtudiant: number): Observable<any> {
    const url = `${this.data}/${idEvenement}/${idEtudiant}`;
    return this.http.post(url, null); 
  }
  getEvenementByParticipation(idParticipation: number): Observable<any> {
    return this.http.get(`${this.data}/by-participation/${idParticipation}`);
  }
}
