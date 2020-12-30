import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from './user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{
  isAdmin: boolean;

  constructor(private router: Router,
              private userService: UserService,
              private token: TokenStorageService) {
  }

   async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
     await this.userService.getRole().then(
       value => this.isAdmin = value.userAdmin
     ).catch((err: HttpErrorResponse) => {
       console.log('error in guard');
     });
     if (this.isAdmin){
       return true;
     }else {
       if (!this.token.getToken() || !this.isAdmin){
         await this.router.navigate(['login']);
       }
       return false;
     }
     return false;

   }
}
