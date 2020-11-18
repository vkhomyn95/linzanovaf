import { Component, OnInit } from '@angular/core';
import {CabinetService} from '../../../services/cabinet.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../services/token-storage.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-cabinet-statistic',
  templateUrl: './cabinet-statistic.component.html',
  styleUrls: ['./cabinet-statistic.component.scss']
})
export class CabinetStatisticComponent implements OnInit {
  usersCount: number;
  changeView: boolean;
  isLoggedIn = false;


  constructor(private cabinetService: CabinetService,
              private userService: UserService,
              private router: Router,
              private tokenStorageService: TokenStorageService) {
    this.changeView = false;
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  getAllUserOrders(): void {
    this.router.navigate(['/cabinet/orders']);
  }

  getUserData(): void {
    this.router.navigate(['/cabinet/user']);
  }

  logOut(): void {
    this.tokenStorageService.signOut();
    this.changeView = false;
    this.router.navigateByUrl(`/login`);
  }
}
