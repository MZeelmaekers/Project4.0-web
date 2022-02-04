import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Result} from "../models/result";

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private httpClient: HttpClient) { }

  token: string = localStorage.getItem('token') ?? ''
  url = "https://project40-api-dot-net20220124112651.azurewebsites.net/api/"

  getResultById(id: number): Observable<Result> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token );
    return this.httpClient.get<Result>(this.url + "result/" + id, {headers: headers});
  }

   postResult(result: Result): Observable<Result>{
     console.log('resultService')
    console.log(result)
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token);
    return this.httpClient.post<Result>(this.url + 'Result', result, {headers: headers});
  }
}
