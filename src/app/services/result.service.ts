import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Plant} from "../models/plant";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private httpClient: HttpClient) { }

  token: string = localStorage.getItem('token') ?? ''
  url = "https://project40-api-dot-net20220124112651.azurewebsites.net/api/"

  getResultById(id: number): Observable<Plant> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token );
    return this.httpClient.get<Plant>(this.url + "result/" + id, {headers: headers});
  }
}
