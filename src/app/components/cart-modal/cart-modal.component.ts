import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {CartObjectService} from '../../services/components-data/cart-object.service';
import {CartItems} from '../../models/order/CartItems';
import {Drops} from '../../models/drops/Drops';
import {Lens} from '../../models/lense/Lens';
import {Solution} from '../../models/solution/Solution';
import {SpecialOffer} from '../../models/special-offers/SpecialOffer';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {
  @Input() mbWidth;
  cartVisisbility = false;
  cartItems: CartItems[];
  cartItemsQuantity = 0;
  cartItemsPrice = 0;
  href: string;

  constructor(private router: Router,
              private cartObjectService: CartObjectService,
              private location: Location) {
    this.cartObjectService.getObject().subscribe(value => {
      if (value){
        this.cartItems = value;
        this.cartItems.map(item => {
          this.cartItemsPrice = 0;
          this.cartItemsQuantity = 0;
          item.drops.map(valuePrice => {
            this.cartItemsPrice += valuePrice.price;
            this.cartItemsQuantity += valuePrice.quantity;
          });
          item.solutions.map(valuePrice => {
            this.cartItemsPrice += valuePrice.price;
            this.cartItemsQuantity += valuePrice.quantity;
          });
          item.lenses.map(valuePrice => {
            this.cartItemsPrice += valuePrice.price;
            this.cartItemsQuantity += valuePrice.quantity;
            });
          item.offers.map(valuePrice => {
            this.cartItemsPrice += valuePrice.price;
            this.cartItemsQuantity += valuePrice.quantity;
          });
        });
      } else {
        this.cartItems = null;
      }
    });
  }

  ngOnInit(): void {
    this.href = '/cart';
  }

  showCart(): boolean {
    if (this.router.url.includes('/cart')) {
      this.cartVisisbility = false;
    }else {
      return this.cartVisisbility = !this.cartVisisbility;
    }
  }

  deleteCareItemFromCart(care: Drops): void {
    this.cartItems.map(value => {
      const dropInArr = value.drops.find(drop => drop.name === care.name);
      this.cartItemsPrice -= dropInArr.price;
      this.cartItemsQuantity -= dropInArr.quantity;
      const index = value.drops.indexOf(dropInArr);
      if (index > -1) {
        value.drops.splice(index, 1);
      }
    });
    this.cartObjectService.sendObject(this.cartItems);
  }

  deleteLenseItemFromCart(lense: Lens): void {
    this.cartItems.map(value => {
      const lensesInArr = value.lenses.find(lens => lens.name === lense.name);
      this.cartItemsPrice -= lensesInArr.price;
      this.cartItemsQuantity -= lensesInArr.quantity;
      const index = value.lenses.indexOf(lensesInArr);
      if (index > -1) {
        value.lenses.splice(index, 1);
      }
    });
    this.cartObjectService.sendObject(this.cartItems);
  }

  deleteSolutionItemFromCart(solution: Solution): void {
    this.cartItems.map(value => {
      const solutionInArr = value.solutions.find(sol => sol.name === solution.name);
      this.cartItemsPrice -= solutionInArr.price;
      this.cartItemsQuantity -= solutionInArr.quantity;
      const index = value.solutions.indexOf(solutionInArr);
      if (index > -1) {
        value.solutions.splice(index, 1);
      }
    });
    this.cartObjectService.sendObject(this.cartItems);
  }

  deleteOfferItemFromCart(offer: SpecialOffer): void {
    this.cartItems.map(value => {
      const offerInArr = value.offers.find(off => off.name === offer.name);
      this.cartItemsPrice -= offerInArr.price;
      this.cartItemsQuantity -= offerInArr.quantity;
      const index = value.offers.indexOf(offerInArr);
      if (index > -1) {
        value.offers.splice(index, 1);
      }
    });
    this.cartObjectService.sendObject(this.cartItems);
  }
}
