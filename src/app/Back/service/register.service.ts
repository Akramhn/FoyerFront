import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/Model/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  URL='http://localhost:8080/api/v1/auth/register';

  registerUser(user:any){
    return this.http.post(this.URL,user);
  }
  
}
