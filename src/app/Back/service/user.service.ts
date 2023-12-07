import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/Model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  URL='http://localhost:8080/api/v1/users'
  constructor(private http:HttpClient) { }


  getUser(email: any) {
    return this.http.get<User>(this.URL+"/findByEmail/"+email) 
   }
}
