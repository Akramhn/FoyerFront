import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from 'src/app/Model/etudiant';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  updateEtudiant(etudiant: Etudiant) {
    return this.http.put(`${environment.baseUrl}/etudiant/update`, etudiant);
  }

  getAllEtudiants() {
    return this.http.get<Etudiant[]>(`${environment.baseUrl}/etudiant/all`);
  }

  getOneEtudiant(idEtudiant: number) {
    return this.http.get<Etudiant>(`${environment.baseUrl}/etudiant/${idEtudiant}`);
  }
  getEtudiantByEmail(email: string) {
    const url = `${environment.baseUrl}/etudiant/findByEmail?email=${email}`; // Update URL based on your backend endpoint
    return this.http.get<Etudiant>(url); // Assuming you expect a single Etudiant response
  }
  
  getUsers(page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    // return this.http.get<any>(`${environment.baseUrl}/etudiant/usersperpage'${params}`);
    return this.http.get<any>(`${environment.baseUrl}/etudiant/usersperpage`, { params });
  }

  deleteEtudiant(idEtudiant: number, httpOptions: any): Observable<any> {
    const url = `${environment.baseUrl}/etudiant/delete/${idEtudiant}`;
    return this.http.delete(url, httpOptions);
  }
  updatePassword(idEtudiant:number , password:string){
    return this.http.put(`${environment.baseUrl}/etudiant/updatePassword/${idEtudiant}/${password}`, {})
  }

  updateImage(idEtudiant:number , newImage:any){
    return this.http.put(`${environment.baseUrl}/etudiant/updateImage/${idEtudiant}`, newImage)
  }
}
