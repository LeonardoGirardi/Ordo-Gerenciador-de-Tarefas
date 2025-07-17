// ordo-frontend/src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private tokenKey = 'ordo_token';

  constructor(private http: HttpClient) {}

  register(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem(this.tokenKey, res.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getCurrentUser(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get('http://localhost:3000/api/me', { headers });
  }
}
