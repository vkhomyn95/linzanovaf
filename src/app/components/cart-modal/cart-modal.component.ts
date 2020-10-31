import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {
  cartVisisbility = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showCart(): boolean {
    return this.cartVisisbility = !this.cartVisisbility;
  }

  goToCart(): void {
    this.cartVisisbility = !this.cartVisisbility;
    this.router.navigate(['cart']);
  }
}
