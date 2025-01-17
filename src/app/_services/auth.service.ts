import { environment } from './../../environments/environment';
import { User } from './../_models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password }, { withCredentials: true})
        .pipe(map(user => {
          this.userSubject.next(user);
          this.startRefreshTokenTimer();
          return user;
        }));
  }

  logout() {
    this.http.post<any>(`${environment.apiUrl}/users/revoke-token`, {}, { withCredentials: true }).subscribe();
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  refreshToken() {
    return this.http.post<any>(`${environment.apiUrl}/users/refresh-token`, {}, { withCredentials: true })
        .pipe(map(user => {
          this.userSubject.next(user);
          this.startRefreshTokenTimer();
          return user;
        }));
  }

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.userValue.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
