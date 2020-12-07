import { Component, OnDestroy, OnInit} from '@angular/core';
import {CartObjectService} from '../../services/components-data/cart-object.service';
import {CartItems} from '../../models/order/CartItems';
import {ActivatedRoute} from '@angular/router';
import {Drops} from '../../models/drops/Drops';
import {TokenStorageService} from '../../services/token-storage.service';
import {CabinetService} from '../../services/cabinet.service';
import {LensService} from '../../services/lens.service';
import {Items, OrderToSend} from '../../models/order/OrderToSend';
import {lenseDiopters, lenseQuantity} from '../../constants/lense/lenses';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  orderStep = 0;
  cartItems: CartItems[];
  totalPrice = 0;
  authUserData;
  itemsToSend: Items[] = [{
    offers: [],
    drops: [],
    lenses: []
  }];
  lenseQuantity; lenseDiopters;


  constructor(private cartObjectService: CartObjectService,
              private activatedRoute: ActivatedRoute,
              private token: TokenStorageService,
              private cabinetService: CabinetService,
              private lensService: LensService) {
    this.activatedRoute.params.subscribe(value => {
      this.cartItems = history.state.item;
      this.totalPrice = history.state.totalPrice;
    });
    this.lenseQuantity = lenseQuantity; this.lenseDiopters = lenseDiopters;
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
    console.log('-------');
    console.log(this.authUserData);
    this.cartItems.map(items => {
      items.offers.map(offers => {
        this.itemsToSend.map(itemOffer => itemOffer.offers.push({offerId: offers.id}));
      });
      items.lenses.map(lenses => {
        const properties = `Кількість: ${lenses.quantity} Діоптрії: ${lenses.diopters}`;
        this.itemsToSend.map(itemOffer => itemOffer.lenses.push({lenseId: lenses.id, properties: properties}));
      });
      items.drops.map(drops => {
        this.itemsToSend.map(itemOffer => itemOffer.drops.push({dropId: drops.id}));
      });
    });
    const order = {
      createdAt: '2020-09-01 12:18:51',
      totalSumm: this.totalPrice,
      lastName: this.authUserData.lastName,
      firstName: this.authUserData.firstName,
      phone: this.authUserData.phone,
      items: this.itemsToSend,
      user: this.authUserData.id
    };

    console.log(order);
    this.lensService.createOrder(order).subscribe(value => console.log(value));
  }

  changeQuantity(item: CartItems, event): void {
    item.lenses.map(value => {
      value.quantity = event.target.value;
    });
    console.log(this.cartItems);
  }

  changeDiopters(item: CartItems, event): void {
    item.lenses.map(value => {
      value.diopters = event.target.value;
    });
    console.log(this.cartItems);
  }
}
