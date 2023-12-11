import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailServiceService {
  constructor(private http: HttpClient) {}
  data = 'http://localhost:9090/api/email/send';

  sendMail(to: string, subject: string, text: string): Observable<string> {
    const emailRequest = {
      to: to,
      subject: subject,
      text: text
    };
    console.log("emailRequest",emailRequest);

    return this.http.post<string>(this.data, emailRequest);
  }
}
