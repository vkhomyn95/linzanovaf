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
export class CartModalComponent implements OnInit, OnDestroy {
  cartVisisbility = false;
  cartItems: CartItems[];
  cartItemsQuantity = 0;
  subscription: Subscription;

  constructor(private router: Router,
              private cartObjectService: CartObjectService) {
    this.subscription = this.cartObjectService.getObject().subscribe(value => {
      if (value){
        this.cartItems = value;
        console.log(this.cartItems);
      } else {
        this.cartItems = null;
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  showCart(): boolean {
    return this.cartVisisbility = !this.cartVisisbility;
  }

  goToCart(): void {
    this.cartVisisbility = !this.cartVisisbility;
    this.router.navigate(['cart']);
  }

  deleteCareItemFromCart(care: Drops): void {
    this.cartItems.map(value => {
      const dropInArr = value.drops.find(drop => drop.name === care.name);
      const index = value.drops.indexOf(dropInArr);
      if (index > -1) {
        value.drops.splice(index, 1);
      }
    });
    console.log(this.cartItems);
  }
}
