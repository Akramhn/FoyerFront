import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coach } from 'src/app/Model/coach';

@Injectable({
  providedIn: 'root',
})
export class CoachService {
  private apiUrl = 'http://localhost:9191/coach'; // Adjust the API URL based on your server

  constructor(private http: HttpClient) {}

  addCoach(coach: Coach): Observable<Coach> {
    return this.http.post<Coach>(`${this.apiUrl}`, coach);
  }

  updateCoach(id: number, coach: Coach): Observable<Coach> {
    return this.http.put<Coach>(`${this.apiUrl}/${id}`, coach);
  }

  getCoachById(id: number): Observable<Coach> {
    return this.http.get<Coach>(`${this.apiUrl}/${id}`);
  }

  getAllCoaches(): Observable<Coach[]> {
    return this.http.get<Coach[]>(`${this.apiUrl}/all`);
  }

  deleteCoach(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
