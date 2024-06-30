import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Admin } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  //URLS
  private loginUrl = 'https://restaurantapi.bssoln.com/api/Auth/SignIn';

  // User data and token management
  private currentUserSubject = new BehaviorSubject<Admin | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Admin | null>(this.getUserFromStorage());
  }


  // constructor(private http: HttpClient) {}

  //login
  login(userName: string, password: string): Observable<any> {
    const body = { userName, password };
    return this.http.post<any>(this.loginUrl, body).pipe(
      tap(response => {
        // Store token and user data in localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      })
    );
  }

  private getUserFromStorage(): Admin | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }



}
