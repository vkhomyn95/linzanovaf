import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CartObjectService} from '../../services/components-data/cart-object.service';
import {Subscription} from 'rxjs';
import {CartItems} from '../../models/order/CartItems';
import {Drops} from '../../models/drops/Drops';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {
  cartVisisbility = false;
  cartItems: CartItems[];
  cartItemsQuantity = 0;
  cartItemsPrice = 0;

  constructor(private router: Router,
              private cartObjectService: CartObjectService) {
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
          });
      } else {
        this.cartItems = null;
      }
    });

  }

  ngOnInit(): void {}

  // ngOnChanges(): void {
  //   this.cartItems.map(value => {
  //     value.drops.map(valuePrice => {
  //       this.cartItemsPrice += valuePrice.price;
  //       console.log(this.cartItemsPrice);
  //     });
  //     value.solutions.map(valuePrice => {
  //       this.cartItemsPrice += valuePrice.price;
  //     });
  //     value.lenses.map(valuePrice => {
  //       this.cartItemsPrice += valuePrice.price;
  //     });
  //   });
  // }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }

  showCart(): boolean {
    // if (this.cartItems) {
    if (this.router.url.includes('/cart')) {
      this.cartVisisbility = false;
    }else {
      return this.cartVisisbility = !this.cartVisisbility;
    }

    // }else {
    //   this.cartListErrors.push('Будь ласка, добавте товар у корзину!');
    //   this.cartValidator = true;
    //   setTimeout(() => {
    //     this.cartValidator = false;
    //     this.cartListErrors.splice(-1, 1);
    //   }, 5000);
    // }
  }

  goToCart(): void {
    this.cartVisisbility = !this.cartVisisbility;
    const item = this.cartItems;
    const totalPrice = this.cartItemsPrice;
    this.router.navigate(['cart'], {state: {item, totalPrice} });
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
    console.log(this.cartItems);
  }
}
