import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "../security/user";
import {Observable} from 'rxjs';
import {UserResponse} from "../security/userResponse";
import {Role} from "../models/role";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  getUser(): User | null {
    if (this.isLoggedIn()){
      console.log(parseInt(localStorage.getItem('id') ?? '0'))
      return { id : parseInt(localStorage.getItem('id') ?? '0') ,
        email: localStorage.getItem('email') ?? '', password: '',
        token: this.getToken(),address: '',zipCode: '',hometown:'',
        role: Role.User, superVisorId:0,name:'',createdAt:new Date() };
    } else {
      return null;
    }
  }

  deleteToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  authenticate(user: User): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>('https://project40-api-dot-net20220124112651.azurewebsites.net/api/user/authenticate', user);
  }

  register(user: User): Observable<UserResponse> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<UserResponse>('https://project40-api-dot-net20220124112651.azurewebsites.net/api/User', user, {headers: headers});
  }
}
