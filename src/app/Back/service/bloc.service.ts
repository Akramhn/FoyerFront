import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bloc } from 'src/app/Model/bloc';

@Injectable({
  providedIn: 'root',
})
export class BlocService {
  urlBloc = 'http://localhost:9090/bloc';
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    }),
  };

  getBlocs() {
    return this.http.get<Bloc[]>(`${this.urlBloc}`);
  }
  getBloc(id: number) {
    return this.http.get<Bloc>(`${this.urlBloc}/${id}`);
  }
  deleteBloc(id: number): Observable<Bloc> {
    return this.http.delete<Bloc>(`${this.urlBloc}/${id}`);
  }
  addBloc(b: Bloc): Observable<Bloc> {
    return this.http.post<Bloc>(`${this.urlBloc}`, b);
  }
  getBlocByFoyer(idB: number) {
    return this.http.get<Bloc[]>(`${this.urlBloc}/bloc/${idB}`);
  }
  affecterChambreABloc(numChamb: number, idBloc: number): Observable<any> {
    return this.http.put(`${this.urlBloc}/${idBloc}/${numChamb}`,numChamb);
  }
  affecterBlocAFoyer(idbloc: number, idfoyer: number): Observable<Bloc> {
    return this.http.put<Bloc>(`${this.urlBloc}/affect/${idbloc}`,idfoyer);
  }
}
