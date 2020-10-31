import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from '../services/token-storage.service';
import {Observable, of, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {log} from 'util';
import {UserService} from '../services/user.service';

const TOKEN_HEADER_KEY = 'Authorization';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private token: TokenStorageService, private router: Router, private userService: UserService) {}
  private handleAuthError(err: HttpErrorResponse): Observable<any> {

    if (err instanceof HttpErrorResponse) {
      if (err.status === 403) {
        this.router.navigateByUrl(`/login`);
        return of(err.message);
      }
      if (err.status === 401 && this.token.getToken()){
        const confirmStatus = confirm('Your session is old? Would you like to renew?');
        if (confirmStatus === true){
          this.userService.refreshToken().subscribe(value => {
            this.token.saveToken(value.token);
          });
        }else {
          this.token.signOut();
          this.router.navigateByUrl(`/login`);
        }
      }else {
        this.router.navigateByUrl(`/login`);
      }
    }
    return throwError(err);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
    }
    if (req.headers.get('skip')){
      return next.handle(req);
    }
    return next.handle(authReq).pipe(catchError(x => this.handleAuthError(x)));
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
