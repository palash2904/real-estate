import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  apiUrl = environment.url

  constructor(private http: HttpClient, public route: Router) { }

  setUserToken(token: string) {
    localStorage.setItem('userToken', token)
  }

  getUserToken() {
    return localStorage.getItem('token')
  }

  setAgentToken(token: string) {
    localStorage.setItem('agentToken', token)
  }

  getAgentToken() {
    return localStorage.getItem('token')
  }

  // isLogedIn() {
  //   return this.getUserToken() !== null;
  // }


  getApi(url: any): Observable<any> {
    return this.http.get(this.apiUrl + url)
  };

  postAPI(url: any, data: any): Observable<any> {
    return this.http.post(this.apiUrl + url, data)
  };

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('agentToken');
    localStorage.removeItem('userDetail');
    localStorage.removeItem('agentDetail');
    this.route.navigateByUrl('');
  }


}
