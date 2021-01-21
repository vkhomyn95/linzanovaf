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
  isOpen = false;

  constructor(private router: Router,
              private token: TokenStorageService) {
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

  goContactLenses(): void {
    this.isOpen = !this.isOpen;
    this.router.navigate(['lenses']);
  }

  goSolutions(): void {
    this.isOpen = !this.isOpen;
    this.router.navigate(['solutions']);
  }

  goCares(): void {
    this.isOpen = !this.isOpen;
    this.router.navigate(['cares']);
  }
}
