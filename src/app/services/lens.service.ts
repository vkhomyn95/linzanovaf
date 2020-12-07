import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Solution} from '../models/solution/Solution';
import {Lens} from '../models/lense/Lens';
import {Drops} from '../models/drops/Drops';
import {SpecialOffer} from '../models/special-offers/SpecialOffer';

@Injectable({
  providedIn: 'root'
})
export class LensService {

  constructor(private httpClient: HttpClient) { }

  addLens(lens: Lens): Observable<Lens> {
    return this.httpClient.post<Lens>('/api/lens/user/1', lens);
  }

  addSolution(solution: Solution): Observable<Solution> {
    return this.httpClient.post<Solution>('/api/solution/user/1', solution);
  }

  addLensDrops(drops: Drops): Observable<Drops> {
    return this.httpClient.post<Drops>('/api/drops/user/1', drops);
  }

  addSpecialOffer(offer: SpecialOffer): Observable<SpecialOffer> {
    return this.httpClient.post<SpecialOffer>('/api/special/user/1', offer);
  }

  createOrder(order): Observable<any> {
    return this.httpClient.post<any>(`/api/order`, order);
  }

}
