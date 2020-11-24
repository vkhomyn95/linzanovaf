import { Component, OnDestroy, OnInit} from '@angular/core';
import {CartObjectService} from '../../services/components-data/cart-object.service';
import {CartItems} from '../../models/order/CartItems';
import {ActivatedRoute} from '@angular/router';
import {Drops} from '../../models/drops/Drops';
import {TokenStorageService} from '../../services/token-storage.service';
import {CabinetService} from '../../services/cabinet.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  orderStep = 2;
  cartItems: CartItems[];
  totalPrice = 0;
  authUserData;


  constructor(private cartObjectService: CartObjectService,
              private activatedRoute: ActivatedRoute,
              private token: TokenStorageService,
              private cabinetService: CabinetService) {
    this.activatedRoute.params.subscribe(value => {
      this.cartItems = history.state.item;
      this.totalPrice = history.state.totalPrice;
    });
  }

  ngOnInit(): void {
    console.log(this.cartItems);

    this.cabinetService.getUserByUsername().subscribe(value => {
      this.authUserData = value;
      console.log(this.authUserData);
    });

  }

  ngOnDestroy(): void {
  }

  nextStep(): void {
    if (this.orderStep === 2) {
      return;
    }
    this.orderStep += 1;
  }

  prevStep(): void {
    if (this.orderStep === 0) {
      return;
    }
    this.orderStep -= 1;
  }

  // order(): void {
  //   const order = {
  //     "createdAt": "2020-09-01 12:18:51",
  //     "summ": 3800,
  //     "totalSumm": 3800,
  //     "lastName": "Vasya",
  //     "firstName": "Jak",
  //     "patronymic": "Batcovych",
  //     "phone": "+380984154979",
  //     "customerComment": 'comment',
  //     "customer": {
  //       "fields": 'Якщо є клієнт у базі'
  //     },
  //     "delivery": {
  //       "street": 'street',
  //       "city": 'city'
  //     },
  //     "items": [
  //       {
  //         "initialPrice": 2000,
  //         "quantity": 1,
  //         "id": 100,
  //         "displayName": 'робот'
  //       },
  //       {
  //         "initialPrice": 1000,
  //         "quantity": 1,
  //         "id": 101,
  //         "displayName": 'пальто'
  //       }
  //     ]
  //   }
  // }

  deleteCareFromList(care: Drops): void {
    this.cartItems.map(value => {
      const dropInArr = value.drops.find(drop => drop.name === care.name);
      this.totalPrice -= dropInArr.price;
      const index = value.drops.indexOf(dropInArr);
      if (index > -1) {
        value.drops.splice(index, 1);
      }
    });
    console.log(this.cartItems);
  }

  checkOut(): void {

  }
}
