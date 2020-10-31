import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettlementsService {
  private url: string;

  constructor(private httpClient: HttpClient) {}

  getSettlements(name): Observable<any> {
    this.url = '/api/settlements?';
    return this.httpClient.get<any>(this.url + `name=${name}`);
  }

  getWarehouses(name): Observable<any> {
    this.url = '/api/warehouses?';
    return this.httpClient.get<any>(this.url + `city=${name}`);
  }

}
