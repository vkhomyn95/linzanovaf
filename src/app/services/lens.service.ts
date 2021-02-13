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
    return this.httpClient.post<Lens>('/api/lens', lens);
  }

  addLensImage(lensId, formData, options): Observable<any>{
    return this.httpClient.post<any>(`/api/lenses/${lensId}/photo`, formData, options);
  }

  addLensComment(lensId, comment): Observable<any>{
    return this.httpClient.post<any>(`/api/lens/${lensId}/comments`, comment);
  }

  addSolution(solution: Solution): Observable<Solution> {
    return this.httpClient.post<Solution>('/api/solution', solution);
  }

  addSolutionImage(solutionId, formData, options): Observable<any>{
    return this.httpClient.post<any>(`/api/solution/${solutionId}/photo`, formData, options);
  }

  addSolutionComment(solutionId, comment): Observable<any>{
    return this.httpClient.post<any>(`/api/solution/${solutionId}/comments`, comment);
  }

  addLensDrops(drops: Drops): Observable<Drops> {
    return this.httpClient.post<Drops>('/api/drops', drops);
  }

  addLensDropImage(dropId, formData, options): Observable<any>{
    return this.httpClient.post<any>(`/api/drops/${dropId}/photo`, formData, options);
  }

  addLensDropComment(dropId, comment): Observable<any>{
    return this.httpClient.post<any>(`/api/drop/${dropId}/comments`, comment);
  }

  addSpecialOffer(offer: SpecialOffer): Observable<SpecialOffer> {
    return this.httpClient.post<SpecialOffer>('/api/special', offer);
  }

  addOfferImage(offerId, formData, options): Observable<any>{
    return this.httpClient.post<any>(`/api/special/${offerId}/photo`, formData, options);
  }

  createOrder(order): Observable<any> {
    return this.httpClient.post<any>(`/api/order`, order);
  }

}
