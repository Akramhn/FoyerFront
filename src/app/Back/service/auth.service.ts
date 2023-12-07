import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPayload } from 'src/app/Model/login-pay-load.model';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
 

  constructor(private http: HttpClient) { }

  registerEtudiant(formData: FormData) {
    return this.http.post(`${environment.baseUrl}/auth/registerEtudiant`, formData);
  }

  login(user: LoginPayload) {
    return this.http.post(`${environment.baseUrl}/auth/login`, user);
  }

  forgetPassword(email: string) {
    return this.http.post(`${environment.baseUrl}/auth/forgetpassword?email=${email}`,{});
  }

  resetPassword(passwordResetToken: string, newPassword: string) {
    return this.http.post(`${environment.baseUrl}/auth/resetPassword/${passwordResetToken}?newPassword=${newPassword}`, {});
  }

  
}
