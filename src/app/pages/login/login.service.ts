import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from 'express';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = environment.url

  constructor(private http: HttpClient, private route: Router) { }

  setToken(token: string){
    localStorage.setItem('token', token)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getUserToken(){
    return localStorage.getItem('userToken')
  }

  isLogedIn(){
    return this.getToken() !== null;
  }

  loginUser(params: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'admin-login', params);
  }

}
