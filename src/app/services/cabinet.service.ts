import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CabinetService {

  constructor(private httpClient: HttpClient, private token: TokenStorageService) { }

  getUsersCount(): Observable<any> {
    return this.httpClient.get<any>('/api/users/count');
  }
  getAllUsers(page, size): Observable<any> {
    return this.httpClient.get<any>(`/api/users?page=${page}&size=${size}`);
  }
  getUser(userId): Observable<any> {
    return this.httpClient.get<any>(`/api/users/${userId}`);
  }
  getUserByUsername(): Observable<any> {
    if (this.token.getToken()) {
      return this.httpClient.get<any>(`/api/users/auth`);
    }else {
      return this.httpClient.get<any>(`/api/users/auth`, {headers: {skip: 'true'}});
    }
  }
  getUserStatsByUsername(): Observable<any> {
    if (this.token.getToken()) {
      return this.httpClient.get<any>(`/api/users/stats`);
    }
  }
  searchUserByName(username, page, size): Observable<any> {
    return this.httpClient.get<any>(`/api/users/name?name=${username}&page=${page}&size=${size}`);
  }
  updateUser(userId, user): Observable<any> {
    return this.httpClient.post<any>(`/api/users/${userId}`, user);
  }
  updateCurrentUser(user): Observable<any>{
    return this.httpClient.post<any>(`/api/users/update`, user);
  }
  updateCurrentUserPassword(dataPassword): Observable<any> {
    return this.httpClient.post<any>(`/api/users/password`, dataPassword);
  }
  getLensesCount(): Observable<any> {
    return this.httpClient.get<any>('/api/lenses/count');
  }
  getAllLenses(page, size): Observable<any> {
    return this.httpClient.get<any>(`/api/lenses?page=${page}&size=${size}`, {headers: {skip: 'true'}});
  }
  getLens(lensId): Observable<any> {
    return this.httpClient.get<any>(`/api/lenses/${lensId}`);
  }
  updateLens(lensId, lens): Observable<any> {
    return this.httpClient.post<any>(`/api/lens/${lensId}`, lens);
  }
  searchLensesByName(lensName, page, size): Observable<any> {
    return this.httpClient.get<any>(`/api/lenses/name?name=${lensName}&page=${page}&size=${size}`);
  }
  getLensesByFilter(page, size, colName, nameValue): Observable<any> {
    return this.httpClient.get<any>(`/api/lenses/filter?page=${page}&size=${size}&colName=${colName}&name=${nameValue}`);
  }
  getLensImage(name, format): Observable<Blob> {
    const headers = new HttpHeaders().set('format', format);
    return this.httpClient.get<any>(`/api/lenses/image?name=${encodeURIComponent(name)}`, {headers: headers, responseType: 'blob' as 'json'});
  }
  getSolutionsCount(): Observable<any> {
    return this.httpClient.get<any>('/api/solution/count');
  }
  getAllSolutions(page, size): Observable<any> {
    return this.httpClient.get<any>(`/api/solution?page=${page}&size=${size}`, {headers: {skip: 'true'}});
  }
  getSolution(solutionId): Observable<any> {
    return this.httpClient.get<any>(`api/solution/${solutionId}`);
  }
  updateSolution(solutionId, solution): Observable<any> {
    return this.httpClient.post<any>(`/api/solution/${solutionId}`, solution);
  }
  searchSolutionsByName(solutionName, page, size): Observable<any> {
    return this.httpClient.get<any>(`/api/solution/name?name=${solutionName}&page=${page}&size=${size}`);
  }
  getSolutionsByFilter(page, size, colName, nameValue): Observable<any> {
    return this.httpClient.get<any>(`/api/solution/filter?page=${page}&size=${size}&colName=${colName}&name=${nameValue}`);
  }
  getSolutionImage(name, format): Observable<Blob> {
    const headers = new HttpHeaders().set('format', format);
    return this.httpClient.get<any>(`/api/solution/image?name=${encodeURIComponent(name)}`, {headers: headers, responseType: 'blob' as 'json'});
  }
  getCareCount(): Observable<any> {
    return this.httpClient.get<any>('/api/drops/count');
  }
  getAllCares(page, size): Observable<any> {
    return this.httpClient.get<any>(`/api/drops?page=${page}&size=${size}`, {headers: {skip: 'true'}});
  }
  getCare(careId): Observable<any> {
    return this.httpClient.get<any>(`/api/drops/${careId}`, {headers: {skip: 'true'}});
  }
  updateCare(careId, care): Observable<any> {
    return this.httpClient.post<any>(`/api/drops/${careId}`, care);
  }
  searchCaresByName(careName, page, size): Observable<any> {
    return this.httpClient.get<any>(`/api/drops/name?name=${careName}&page=${page}&size=${size}`);
  }
  getCaresByFilter(page, size, colName, nameValue): Observable<any> {
    return this.httpClient.get<any>(`/api/drops/filter?page=${page}&size=${size}&colName=${colName}&name=${nameValue}`);
  }
  getCareImage(name, format): Observable<Blob> {
    const headers = new HttpHeaders().set('format', format);
    return this.httpClient.get<any>(`/api/cares/image?name=${encodeURIComponent(name)}`, {headers: headers, responseType: 'blob' as 'json'});
  }
  getOffer(offerId): Observable<any> {
    return this.httpClient.get<any>(`/api/special/${offerId}`);
  }
  getSpecialOfferCount(): Observable<any> {
    return this.httpClient.get<any>(`/api/special/count`);
  }
  getAllSpecialOffers(page, size): Observable<any> {
    return this.httpClient.get<any>(`/api/special?page=${page}&size=${size}`, {headers: {skip: 'true'}});
  }
  getOfferImage(format, name): Observable<Blob> {
    const headers = new HttpHeaders().set('format', format);
    return this.httpClient.get<any>(`/api/special/image?name=${encodeURIComponent(name)}`, {headers: headers, responseType: 'blob' as 'json'});
  }
  updateSpecialOffer(offerId, special): Observable<any> {
    return this.httpClient.post<any>(`/api/special/${offerId}`, special);
  }
  getOrdersCount(): Observable<any> {
    return this.httpClient.get<any>('/api/order/count');
  }
  getAllOrders(page, size): Observable<any> {
    return this.httpClient.get<any>(`/api/order?page=${page}&size=${size}`);
  }
  getOrder(orderId): Observable<any> {
    return this.httpClient.get<any>(`/api/order/${orderId}`);
  }
  getAllOrdersByUsername(page, size): Observable<any>{
    return this.httpClient.get<any>(`/api/order/user?page=${page}&size=${size}`);
  }
  updateOrder(orderId, order): Observable<any> {
    return this.httpClient.post<any>(`/api/order/${orderId}`, order);
  }
  searchOrdersByName(orderId): Observable<any> {
    return this.httpClient.get<any>(`/api/order/${orderId}`);
  }
  setUserTrackId(trackingId, orderNumber): Observable<any> {
    return this.httpClient.post<any>(`/api/order/track/${trackingId}`, orderNumber);
  }
  getUserTrackId(trackingId): Observable<any> {
    return this.httpClient.post<any>(`/api/order/tracking/realtime`, trackingId);
  }
}

