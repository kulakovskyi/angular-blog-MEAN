import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {UserInterface} from "../../shared/interfaces/user.interface";
import {catchError, Observable, throwError} from "rxjs";
import {UserResponseInterface} from "../../shared/interfaces/user-response.interface";
import {UserLoginInterface} from "../../shared/interfaces/user-login.interface";
import {
  UserLocalStorageInterface,
  UserLoginResponseInterface
} from "../../shared/interfaces/user-login-response.interface";


@Injectable()
export class AuthService {

  token!: string | null
  user!: UserLocalStorageInterface | null

  constructor(private http: HttpClient) { }

  registerUser(user: UserInterface): Observable<UserResponseInterface>{
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post<UserResponseInterface>('http://localhost:3000/account/reg', user,
      {headers: headers}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  authUser(user: UserLoginInterface): Observable<UserLoginResponseInterface>{
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post<UserLoginResponseInterface>('http://localhost:3000/account/auth', user,
      {headers: headers}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  get tokenLocal(): string | null{
    return localStorage.getItem('token')
  }

  isAuthenticated(): boolean{
    return !!this.tokenLocal
  }

  logOut(){
    this.token = null
    this.user = null
    localStorage.clear()
  }

  storeUser(token: string, user: UserLocalStorageInterface){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token
    this.user = user
  }

}
