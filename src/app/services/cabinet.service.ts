import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CabinetService {

  constructor(private httpClient: HttpClient) { }

  getUsersCount(): Observable<any> {
    return this.httpClient.get<any>('/api/users/count');
  }
  getAllUsers(page, size): Observable<any> {
    return this.httpClient.get<any>(`/api/users?page=${page}&size=${size}`);
  }
  getUser(userId): Observable<any> {
    return this.httpClient.get<any>(`/api/users/${userId}`);
  }
  searchUserByName(username, page, size): Observable<any> {
    return this.httpClient.get<any>(`/api/users/name?name=${username}&page=${page}&size=${size}`);
  }
  updateUser(userId, user): Observable<any> {
    return this.httpClient.post<any>(`/api/users/${userId}`, user);
  }
  getLensesCount(): Observable<any> {
    return this.httpClient.get<any>('/api/lenses/count');
  }
  getAllLenses(page, size): Observable<any> {
    return this.httpClient.get<any>(`/api/lenses?page=${page}&size=${size}`);
  }
  getLens(lensId): Observable<any> {
    return this.httpClient.get<any>(`/api/lenses/${lensId}`);
  }
  updateLens(lensId, userId, lens): Observable<any> {
    return this.httpClient.post<any>(`/api/lenses/${lensId}/user/${userId}`, lens);
  }
  searchLensesByName(lensName, page, size): Observable<any> {
    return this.httpClient.get<any>(`/api/lenses/name?name=${lensName}&page=${page}&size=${size}`);
  }
  getSolutionsCount(): Observable<any> {
    return this.httpClient.get<any>('/api/solution/count');
  }
  getAllSolutions(page, size): Observable<any> {
    return this.httpClient.get<any>(`/api/solution?page=${page}&size=${size}`);
  }
  getSolution(solutionId): Observable<any> {
    return this.httpClient.get<any>(`api/solution/${solutionId}`);
  }
  updateSolution(solutionId, userId, solution): Observable<any> {
    return this.httpClient.post<any>(`/api/solution/${solutionId}/user/${userId}`, solution);
  }
  searchSolutionsByName(solutionName, page, size): Observable<any> {
    return this.httpClient.get<any>(`/api/solution/name?name=${solutionName}&page=${page}&size=${size}`);
  }
  getCareCount(): Observable<any> {
    return this.httpClient.get<any>('/api/drops/count');
  }
  getAllCares(page, size): Observable<any> {
    return this.httpClient.get<any>(`/api/drops?page=${page}&size=${size}`, {headers: {skip: 'true'}});
  }
  getCare(careId): Observable<any> {
    return this.httpClient.get<any>(`/api/drops/${careId}`);
  }
  updateCare(careId, userId, care): Observable<any> {
    return this.httpClient.post<any>(`/api/drops/${careId}/user/${userId}`, care);
  }
  searchCaresByName(careName, page, size): Observable<any> {
    return this.httpClient.get<any>(`/api/drops/name?name=${careName}&page=${page}&size=${size}`);
  }
  getAllOrders(page, size): Observable<any> {
    return this.httpClient.get<any>(`/api/order?page=${page}&size=${size}`);
  }
  getOrder(orderId): Observable<any> {
    return this.httpClient.get<any>(`/api/order/${orderId}`);
  }
  updateOrder(orderId, userId, order): Observable<any> {
    return this.httpClient.post<any>(`/api/order/${orderId}`, order);
  }
  searchOrdersByName(orderName, page, size): Observable<any> {
    return this.httpClient.get<any>(`/api/order/name?name=${orderName}&page=${page}&size=${size}`);
  }
}