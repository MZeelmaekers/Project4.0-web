import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private httpClient: HttpClient) { }
  userId: string = localStorage.getItem('id') ?? ''
  token: string = localStorage.getItem('token') ?? ''
  url = "https://project40-api-dot-net20220124112651.azurewebsites.net/api/"

  getUsers(): Observable<User[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.token );
    return this.httpClient.get<User[]>(this.url + "User/",{headers: headers});
  }

  getSuperVisors(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + "User/SuperVisors");
  }

  getUserById(id: number): Observable<User> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token );
    return this.httpClient.get<User>(this.url + "User/" + id, {headers: headers});
  }

  deleteUser(userId: number): Observable<User>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token);
    return this.httpClient.delete<User>(this.url + 'User/' + userId, {headers: headers});
  }

  putUser(userId: number, user: User): Observable<User>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token);
    return this.httpClient.put<User>(this.url + 'User/' + userId,user, {headers: headers});
  }

  putUserPassword(userId: string,password: string, newPassword: string): Observable<User>{
    const body = {id:userId,password:password,newPassword:newPassword };
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token);
    return this.httpClient.put<any>(this.url + 'User/password/' + userId,body,{headers: headers});
  }
}
