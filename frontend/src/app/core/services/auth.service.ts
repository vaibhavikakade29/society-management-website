import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * ==========================================
   * Register User
   * ==========================================
   */
  register(userData: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/register`,
      userData
    );

  }

  /**
   * ==========================================
   * Login User
   * ==========================================
   */
  login(loginData: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/login`,
      loginData
    );

  }

  /**
   * ==========================================
   * Logged In User
   * ==========================================
   */
  getCurrentUser(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/me`
    );

  }

  /**
   * ==========================================
   * Save JWT Token
   * ==========================================
   */
  saveToken(token: string): void {

    sessionStorage.setItem(
      'token',
      token
    );

  }

  /**
   * ==========================================
   * Get JWT Token
   * ==========================================
   */
  getToken(): string | null {

    return sessionStorage.getItem(
      'token'
    );

  }

  /**
   * ==========================================
   * Save Logged In User
   * ==========================================
   */
  saveUser(user: any): void {

    sessionStorage.setItem(
      'user',
      JSON.stringify(user)
    );

  }

  /**
   * ==========================================
   * Get Logged In User
   * ==========================================
   */
  getUser(): any {

    const user = sessionStorage.getItem('user');

    return user ? JSON.parse(user) : null;

  }

  /**
   * ==========================================
   * User Role
   * ==========================================
   */
  getUserRole(): string {

    const user = this.getUser();

    return user ? user.role : '';

  }

  /**
   * ==========================================
   * Check Login Status
   * ==========================================
   */
  isLoggedIn(): boolean {

    return !!this.getToken();

  }

  /**
   * ==========================================
   * Logout API
   * ==========================================
   */
  logout(): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/logout`,
      {}
    );

  }

  /**
   * ==========================================
   * Clear Session
   * ==========================================
   */
  clearSession(): void {

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

  }

  /**
   * ==========================================
   * Available Flats
   * ==========================================
   */
  getAvailableFlats(wing: string): Observable<any> {

    return this.http.get(
      `http://localhost:5000/api/flats/available/${wing}`
    );

  }

}