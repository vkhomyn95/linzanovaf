import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {LoginUser} from '../../models/user/User';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../services/token-storage.service';
import {SetLoginService} from '../../services/components-data/set-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  isLoggedIn = false;
  invalidLogin = false;
  listErrors: string[] = ['Перевірте правельність введення даних'];

  constructor(private userService: UserService,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private setLoginService: SetLoginService) {
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
          this.setLoginService.sendMessage(true);
          return this.router.navigate(['cabinet']);
        }
      },
      error => {
        this.invalidLogin = true;
      }
    ));
  }
}

