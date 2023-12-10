import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from 'src/app/Model/etudiant';
import { UserRole } from 'src/app/Model/user.model';
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

  getAllUserByRole(role : UserRole) {
    return this.http.get<Etudiant[]>(`${environment.baseUrl}/etudiant/findByRole/${role}`);
  }


  getOneEtudiant(idEtudiant: number) {
    return this.http.get<Etudiant>(`${environment.baseUrl}/etudiant/${idEtudiant}`);
  }
  getEtudiantByEmail(email: string) {
    const url = `${environment.baseUrl}/etudiant/findByEmail?email=${email}`; 
    return this.http.get<Etudiant>(url); 
  }
  

  getAllEtudiantsRole(page: number = 0, size: number = 10, role: UserRole): Observable<Etudiant[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('role', role);

    return this.http.get<Etudiant[]>(`${environment.baseUrl}/etudiant/usersperpage`, { params });
  }
  getAllAdmin(page: number = 0, size: number = 10, role: UserRole): Observable<Etudiant[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('role', role);

    return this.http.get<Etudiant[]>(`${environment.baseUrl}/etudiant/usersperpage`, { params });
  }

  deleteEtudiant(idEtudiant: number){
    const url = `${environment.baseUrl}/etudiant/delete/${idEtudiant}`;
    return this.http.delete(url);
  }
  updatePassword(idEtudiant:number , password:string){
    return this.http.put(`${environment.baseUrl}/etudiant/updatePassword/${idEtudiant}/${password}`, {})
  }

  updateImage(idEtudiant:number , newImage:any){
    return this.http.put(`${environment.baseUrl}/etudiant/updateImage/${idEtudiant}`, newImage)
  }
}
