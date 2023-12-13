import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercice } from 'src/app/Model/exercice';

@Injectable({
  providedIn: 'root',
})
export class ExerciceService {
  private apiUrl = 'http://localhost:9191/Exercice'; // Adjust the API URL based on your server

  constructor(private http: HttpClient) {}

  getAllExercices(): Observable<Exercice[]> {
    return this.http.get<Exercice[]>(this.apiUrl);
  }

  getExerciceById(idExercice: number): Observable<Exercice> {
    return this.http.get<Exercice>(`${this.apiUrl}/${idExercice}`);
  }

  addExercice(exercice: Exercice): Observable<Exercice> {
    return this.http.post<Exercice>(this.apiUrl, exercice);
  }

  updateExercice(exercice: Exercice): Observable<Exercice> {
    return this.http.put<Exercice>(this.apiUrl, exercice);
  }

  removeExercice(idExercice: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idExercice}`);
  }
}
