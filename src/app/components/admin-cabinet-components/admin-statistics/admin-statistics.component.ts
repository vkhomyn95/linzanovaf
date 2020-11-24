import { Component, OnInit } from '@angular/core';
import {CabinetService} from '../../../services/cabinet.service';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../services/token-storage.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.scss']
})
export class AdminStatisticsComponent implements OnInit {
  usersCount: number;
  isLoggedIn = false;
  setTrackingNumberForm: FormGroup;

  constructor(private cabinetService: CabinetService,
              private userService: UserService,
              private router: Router,
              private tokenStorageService: TokenStorageService) {
    this.setTrackingNumberForm = new FormGroup({
      meestNumber: new FormControl(''),
      orderNumber: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
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

  toAddView(): void {
    this.router.navigate(['/admin/add']);
  }

  toSpecialOffersView(): void {
    this.router.navigate(['/admin/offers']);
  }

  addTrackNumberToOrder(): void {
    this.cabinetService.setUserTrackId(this.setTrackingNumberForm.controls.meestNumber.value, parseInt(this.setTrackingNumberForm.controls.orderNumber.value, 10)).subscribe(value => {
      console.log(value);
    });
  }
}
