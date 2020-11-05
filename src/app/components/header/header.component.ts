import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../services/token-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  changeView: boolean;

  constructor(private router: Router,
              private token: TokenStorageService) {


    this.changeView = false;
    if (this.token.getToken()) {
      this.isLoggedIn = true;
    }
  }

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.isLoggedIn = true;
    }
  }

  goCabinet(): void {
    this.router.navigate(['cabinet']);
  }

  goLogin(): void {
    this.router.navigate(['login']);
  }

  logOut(): void {
    this.token.signOut();
    this.changeView = false;
    this.router.navigateByUrl(`/login`);
  }
}
