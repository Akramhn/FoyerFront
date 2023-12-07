import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Universite } from 'src/app/Model/universite';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UniversiteService {

  constructor(private http: HttpClient) { }
  getAllUniversites() {
    return this.http.get<Universite[]>(`${environment.baseUrl}/universite/all`);
  }
}
