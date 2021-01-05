import { Component, OnInit } from '@angular/core';
import {CabinetService} from '../../../services/cabinet.service';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../services/token-storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BroadcastService} from '../../../services/components-data/broadcast.service';

@Component({
  selector: 'app-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.scss']
})
export class AdminStatisticsComponent implements OnInit {
  usersCount: number;
  ordersCount: number;
  isLoggedIn = false;
  setTrackingNumberForm: FormGroup;
  setTTNNumberForm: FormGroup;
  errorResponse = []; successResponse = false;

  constructor(private cabinetService: CabinetService,
              private userService: UserService,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private broadcastService: BroadcastService) {
    this.setTrackingNumberForm = new FormGroup({
      meestNumber: new FormControl('', [Validators.required]),
      orderNumber: new FormControl('', [Validators.required])
    });
    this.setTTNNumberForm = new FormGroup({
      TTNNumber: new FormControl('', [Validators.required]),
      orderNumber: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.cabinetService.getUsersCount().subscribe(value => this.usersCount = value);
    this.cabinetService.getOrdersCount().subscribe(value => this.ordersCount = value);
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
    if (this.setTrackingNumberForm.controls.meestNumber.valid && this.setTrackingNumberForm.controls.orderNumber.valid){
      this.cabinetService.setUserTrackId(this.setTrackingNumberForm.controls.meestNumber.value,
        parseInt(this.setTrackingNumberForm.controls.orderNumber.value, 10)).toPromise()
        .then((response) => {
          if (response){
            setTimeout(() => {
              this.successResponse = true;
            }, 3000);
            this.successResponse = false;
            this.setTrackingNumberForm.reset();
          }else {
            this.broadcastService.http404.asObservable().subscribe(value => {
              if (value === true){
                this.errorResponse.push('Повторіть спробу пізніше');
                this.removeError();
              }
            });
          }
        });
    }else {
      this.errorResponse.push('Заповніть усі поля коректно!');
      this.removeError();
    }
  }

  addTTNNumberToOrder(): void {
    return;
  }

  removeError(): void {
    setTimeout(() => {
      this.errorResponse.splice(-1, 1);
      console.log(this.errorResponse);
    }, 5000);
  }
}
