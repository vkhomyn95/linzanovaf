import { Injectable } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {BroadcastService} from '../services/components-data/broadcast.service';

@Injectable({
  providedIn: 'root'
})
export class BackendInterceptor implements HttpInterceptor {
  public http404 = false;

  constructor(private broadcastService: BroadcastService) { }

  private handleBackendError(err: HttpErrorResponse): Observable<any> {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 500 || err.status === 400) {
        this.http404 = true;
        this.broadcastService.http404.next(true);
        return of(err.message);
      }
    }
    return throwError(err);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req;
    return next.handle(authReq).pipe(catchError(x => this.handleBackendError(x)));
  }
}

export const backendInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BackendInterceptor, multi: true }
];
