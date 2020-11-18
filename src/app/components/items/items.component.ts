import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {CabinetService} from '../../services/cabinet.service';
import {CartObjectService} from '../../services/components-data/cart-object.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  range = 12;
  loader = true;

  drops = [];
  items = [{
    drops: [],
    lenses: [],
    solutions: []
  }];


  constructor(private router: Router,
              private cabinetService: CabinetService,
              private cartObjectService: CartObjectService) { }

  ngOnInit(): void {
    this.cabinetService.getAllCares(0, 10).subscribe(value => {
      this.drops = value.drops;
      this.loader = false;
    });
  }

  viewDetails(): void {
    this.router.navigate(['single']);
  }

  addToCartItem(item): void {
    console.log(item);
    item.quantity = 1;
    if (item.category === 0) {
      this.items.map(value => {
        value.drops.push(item);
      });
      this.cartObjectService.sendObject(this.items);
    }else if (item.category === 1) {
      this.items.map(value => {
        value.lenses.push(item);
      });
      this.cartObjectService.sendObject(this.items);
    }else if (item.category === 2) {
      this.items.map(value => {
        value.solutions.push(item);
      });
      this.cartObjectService.sendObject(this.items);
    }
  }
}
