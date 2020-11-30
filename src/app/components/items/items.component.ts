import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CabinetService} from '../../services/cabinet.service';
import {CartObjectService} from '../../services/components-data/cart-object.service';
import {CartItems} from '../../models/order/CartItems';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnChanges {
  range = 12;
  loader = true;
  totalElements = 0; totalPages = 0;
  currentPage = 0; itemsSize = 1; allPagesSize = 12;

  values = [];
  items: CartItems[];


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private cabinetService: CabinetService,
              private cartObjectService: CartObjectService) {
  }

  ngOnInit(): void {
    if (this.router.url.indexOf('/lenses') > -1) {
      this.cabinetService.getAllLenses(this.currentPage, this.allPagesSize).subscribe(value => {
        this.values = value.lenses;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
        console.log(value);
        this.loader = false;
      });
    }else if (this.router.url.indexOf('/solutions') > -1){
      this.cabinetService.getAllSolutions(this.currentPage, this.allPagesSize).subscribe(value => {
        this.values = value.solutions;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
        console.log(value);
        this.loader = false;
      });
    }else if (this.router.url.indexOf('/cares') > -1) {
      this.cabinetService.getAllCares(this.currentPage, this.allPagesSize).subscribe(value => {
        this.values = value.drops;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
        console.log(value);
        this.loader = false;
      });
    }else {
      this.cabinetService.getAllCares(this.currentPage, this.itemsSize).subscribe(value => {
        this.values = value.drops;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
        console.log(value);
        this.loader = false;
      });
    }
    this.cartObjectService.getObject().subscribe(value => {
      this.items = value;
      console.log(this.items);
    });
  }
  ngOnChanges(): void {
    console.log(this.currentPage);
  }

  viewDetails(category, id, name): void {
    const replacedName = name.replace(/ /g, '-');
    this.router.navigate(['product', replacedName], {state: {stateCategory: category, stateId: id }});
  }

  addToCartItem(item): void {
    console.log(item);
    item.quantity = 1;
    if (item.category === 0) {
      this.items.map(value => {
        value.drops.push(item);
        console.log(this.items);
      });
      this.cartObjectService.sendObject(this.items);
    } else if (item.category === 1) {
      this.items.map(value => {
        value.lenses.push(item);
      });
      this.cartObjectService.sendObject(this.items);
    } else if (item.category === 2) {
      this.items.map(value => {
        value.solutions.push(item);
      });
      this.cartObjectService.sendObject(this.items);
    }
  }

  nextPage(page: any): void {
    if (this.router.url.indexOf('/lenses') > -1) {
      this.cabinetService.getAllLenses(page, this.allPagesSize).subscribe(value => {
        this.values = value.lenses;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
        console.log(value);
        this.loader = false;
      });
    }else {
      this.cabinetService.getAllCares(page, this.itemsSize).subscribe(value => {
        this.values = value.drops;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
        console.log(value);
        this.loader = false;
      });
    }
  }

  prevPage(page: any): void {
    if (this.router.url.indexOf('/lenses') > -1) {
      this.cabinetService.getAllLenses(page, this.allPagesSize).subscribe(value => {
        this.values = value.lenses;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
        this.loader = false;
      });
    }else {
      this.cabinetService.getAllCares(page, this.itemsSize).subscribe(value => {
        this.values = value.drops;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
        console.log(value);
        this.loader = false;
      });
    }
  }
}
