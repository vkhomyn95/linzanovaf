import { Component, OnInit } from '@angular/core';
import {CabinetService} from '../../services/cabinet.service';
import {CartObjectService} from '../../services/components-data/cart-object.service';
import {of, Subscription} from 'rxjs';
import {CartItems} from '../../models/order/CartItems';

@Component({
  selector: 'app-hot-proposition',
  templateUrl: './hot-proposition.component.html',
  styleUrls: ['./hot-proposition.component.scss']
})
export class HotPropositionComponent implements OnInit {
  range = 3;
  loader = true;
  offers = [];
  currentPage =  0;
  currentSize = 3;
  totalElements: number;
  items: CartItems[];
  totalPages: number;


  constructor(private cabinetService: CabinetService,
              private cartObjectService: CartObjectService) { }

  ngOnInit(): void {
    this.cabinetService.getAllSpecialOffers(this.currentPage, this.currentSize).subscribe(value => {
      this.offers = value.specials;
      this.loader = false;
      console.log(this.offers);
    });
    this.cartObjectService.getObject().subscribe(value => {
      if (value){
        this.items = value;
        console.log(value);

      }
    });
    // this.items = this.cartObjectService.getObject();
  }

  addToCart(offer: any): void {
    offer.quantity = 1;
    if (offer.category === 3) {
      this.items.map(value => {
        value.offers.push(offer);
      });
      this.cartObjectService.sendObject(this.items);
      console.log(this.items);
    }
  }
}
