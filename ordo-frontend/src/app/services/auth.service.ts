import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient); // ✅ INJEÇÃO CORRETA
  private apiUrl = 'http://localhost:3000/auth';
  private tokenKey = 'ordo_token';
  private userSubject = new BehaviorSubject<{ name: string, email: string } | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor() {
    this.loadUser();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password });
  }

  loadUser(): void {
    const headers = this.getAuthHeaders();
    this.http.get<any>(`${this.apiUrl}/me`, { headers }).subscribe({
      next: (user) => {
        this.userSubject.next(user);
        localStorage.setItem('ordo_user', JSON.stringify(user));
      },
      error: () => this.userSubject.next(null)
    });
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => {
        localStorage.setItem(this.tokenKey, res.token);
        this.loadUser();
      })
    );
  }

  getCurrentUser(): Observable<any> {
    return this.user$;
  }

  updateName(name: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/update-name`, { name }, { headers }).pipe(
      tap(() => this.loadUser())
    );
  }

  updatePassword(currentPassword: string, newPassword: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/update-password`, { currentPassword, newPassword }, { headers });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('ordo_user');
    this.userSubject.next(null);
  }
}

