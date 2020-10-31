import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user/User';
import {map} from 'rxjs/operators';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) {
  }

  registerUser(user: User): Observable<User> {
    return this.httpClient.post<User>('/api/users/register', user);
  }

  authenticate(user): Observable<any> {
    return this.httpClient.post<any>(`/api/users/login`, user, {headers: {skip: 'true'}});
  }

  async getRole(): Promise<any> {
    return await this.httpClient.get<any>('/api/users/bool').toPromise();
  }

  refreshToken(): Observable<any> {
    return this.httpClient.get<any>(`/api/users/refreshtoken`, {headers: {isRefreshToken: 'true'}});
  }

}
