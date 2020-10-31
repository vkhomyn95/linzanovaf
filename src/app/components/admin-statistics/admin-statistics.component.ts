import { Component, OnInit } from '@angular/core';
import {CabinetService} from '../../services/cabinet.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../services/token-storage.service';

@Component({
  selector: 'app-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.scss']
})
export class AdminStatisticsComponent implements OnInit {
  usersCount: number;
  isLoggedIn = false;
  showAdminBoard = false;
  private roles: string[];

  constructor(private cabinetService: CabinetService,
              private userService: UserService,
              private router: Router,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {

    // this.userService.isUserAdmin().subscribe(value => this.showAdminBoard = value);
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    // if (this.isLoggedIn) {

    // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
    // this.username = user.username;
    // }
    this.cabinetService.getUsersCount().subscribe(value => this.usersCount = value);
  }

  getAllUsers(): void {
    this.router.navigate(['/admin/users']);
  }

  getProductsView(): void {
    this.router.navigate(['/admin/products']);
  }

  getAllOrders(): void {
    this.router.navigate(['/admin/orders']);
  }

}
