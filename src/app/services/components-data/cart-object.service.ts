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
  private objectSource = new BehaviorSubject<CartItems[]>(this.items);
  currentObject = this.objectSource.asObservable();

  sendObject(message: CartItems[]): void {
    this.objectSource.next(message);
  }

  clearObjects(): void {
    this.subject.next();
  }

  getObject(): Observable<any> {
    return this.currentObject;
  }
}
