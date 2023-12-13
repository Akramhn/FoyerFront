import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Salle } from 'src/app/Model/salle';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  private apiUrl = 'http://localhost:9191/salle'; 

  constructor(private http: HttpClient) {}

  retrieveSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${this.apiUrl}/all`);
  }
  addSalle(
    image: File,
    name: string,
    location: string,
    capacity: number
  ): Observable<Salle> {
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
    formData.append('name', name);
    formData.append('location', location);
    formData.append('capacity', capacity.toString());

    return this.http.post<Salle>(`${this.apiUrl}/addSalle`, formData);
  }

  updateSalle(salle: Salle): Observable<Salle> {
    return this.http.put<Salle>(`${this.apiUrl}/updateSalle`, salle);
  }

  getSalleById(id: number): Observable<Salle> {
    return this.http.get<Salle>(`${this.apiUrl}/${id}`);
  }

  removeSalle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
