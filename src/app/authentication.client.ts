import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  private apiUrl = 'https://localhost:7100'; //Change
  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<string> {
    return this.http.post(
      this.apiUrl + '/api/Auth/login',
      {
        Username: username,
        Password: password,
      },
      { responseType: 'text' }
    );
  }
}
