import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chambre } from 'src/app/Model/chambre';

@Injectable({
  providedIn: 'root',
})
export class ChambreService {
  data = 'http://localhost:9090/chambre';
  constructor(private http: HttpClient) {}
  getChambres() {
    return this.http.get<Chambre[]>(`${this.data}`);
  }
  getChambre(id: number) {
    return this.http.get<Chambre>(`${this.data}/${id}`);
  }
  deleteChambre(id: number): Observable<any> {
    return this.http.delete(`${this.data}/${id}`);
  }
  addChambre(c: Chambre): Observable<any> {
    return this.http.post(`${this.data}`, c);
  }

  updateChambre(chambre: Chambre) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<Chambre>(`${this.data}`, chambre, { headers });
  }
}
