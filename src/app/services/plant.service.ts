import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Plant} from "../models/plant";
import {Result} from "../models/result";

@Injectable({
  providedIn: 'root'
})
export class PlantService {


  constructor(private httpClient: HttpClient) { }
  userId: string = localStorage.getItem('id') ?? ''
  token: string = localStorage.getItem('token') ?? ''
  url = "https://project40-api-dot-net20220124112651.azurewebsites.net/api/"

  getPlants(): Observable<Plant[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.token );
    return this.httpClient.get<Plant[]>(this.url + "Plant/User/" + this.userId ,{headers: headers});
  }

  getPlantById(id: number): Observable<Plant> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token );
    return this.httpClient.get<Plant>(this.url + "plant/" + id, {headers: headers});
  }

    postPlant(plant: Plant): Observable<Result>{
    console.log('plant');
    console.log(plant);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token);
    return this.httpClient.post<Result>(this.url + 'Plant', plant, {headers: headers});
  }
}
