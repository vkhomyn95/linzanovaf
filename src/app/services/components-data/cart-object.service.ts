import { Injectable } from '@angular/core';
import {Observable, Subject, BehaviorSubject} from 'rxjs';
import {CartItems} from '../../models/order/CartItems';

@Injectable({
  providedIn: 'root'
})
export class CartObjectService {
  private subject = new Subject();
  items = [{
    drops: [],
    lenses: [],
    solutions: [],
    offers: []
  }];
  private objectSource = new BehaviorSubject<CartItems[]>(JSON.parse(localStorage.getItem('cart')));
  // constructor() {
  //   if (localStorage.getItem('cart')){
  //     this.objectSource = JSON.parse(localStorage.getItem('cart'));
  //   }
  // }

  currentObject = this.objectSource.asObservable();

  // currentObject = localStorage.getItem('cart');

  sendObject(message: CartItems[]): void {
    localStorage.setItem('cart', JSON.stringify(message));
    this.objectSource.next(message);
  }

  clearObjects(): void {
    localStorage.removeItem('cart');
  }

  getObject(): Observable<CartItems[]> {
    if (!localStorage.getItem('cart')){
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
    return this.currentObject;
  }
  setObject(): void {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
}
