import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {LoginUser} from '../../models/user/User';
import {log} from 'util';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  isLoggedIn = false;
  roles: string[] = [];
  invalidLogin = false; listErrors: string[] = ['Перевірте правельність введення даних'];

  constructor(private userService: UserService,
              private router: Router,
              private tokenStorageService: TokenStorageService) {
    this.authForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  login(): void {
    const user: LoginUser = this.authForm.value;
    (this.userService.authenticate(user).subscribe(
      data => {
        if (data.token !== null && data.user !== null) {
          this.invalidLogin = false;
          this.tokenStorageService.saveToken(data.token);
          this.isLoggedIn = true;
          return this.router.navigate(['cabinet']);
        }
      },
      error => {
        this.invalidLogin = true;
      }
    ));
  }
  reloadPage(): void {
    window.location.reload();
  }
}
