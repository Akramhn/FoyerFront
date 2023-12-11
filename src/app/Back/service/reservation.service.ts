import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  data = 'http://localhost:9090/reservation';
  constructor(private http: HttpClient) {}



  addReservation(idChambre: number, cinEtudiant: number): Observable<any> {
    return this.http.post(`${this.data}/${idChambre}/${cinEtudiant}`, {});
  }
  

}
