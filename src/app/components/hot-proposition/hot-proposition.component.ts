import { Component, OnInit } from '@angular/core';
import {CabinetService} from '../../services/cabinet.service';
import {CartObjectService} from '../../services/components-data/cart-object.service';
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
  currentSize = 20;
  totalElements: number;
  items: CartItems[];  offersIndex = [];
  totalPages: number;


  constructor(private cabinetService: CabinetService,
              private cartObjectService: CartObjectService) { }

  ngOnInit(): void {
    this.cabinetService.getAllSpecialOffers(this.currentPage, this.currentSize).subscribe(value => {
      value.specials.map(val => {
        if (val.photo.length > 0 && val.photo.map(f => f.endsWith('.jpg'))){
          this.cabinetService.getOfferImage('jpeg', val.name).subscribe(value1 =>  {
            this.createImageFromBlob(value1, val.id);
          });
        }
      });
      this.offers = value.specials;
      this.loader = false;
    });
    this.cartObjectService.getObject().subscribe(value => {
      if (value){
        this.items = value;
        this.offersIndex = [];
        value[0].offers.map(offer => {
          this.offersIndex.push(offer.id);
        });
        console.log(this.offersIndex);
      }
    });
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

  createImageFromBlob(photo: Blob, imageId): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.offers.map((value) => {
        if (imageId === value.id){
          value.img = reader.result;
        }
      });
    }, false);

    if (photo) {
      reader.readAsDataURL(photo);
    }
  }

}
