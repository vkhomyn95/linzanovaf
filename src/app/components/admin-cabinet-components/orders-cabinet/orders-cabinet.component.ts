import { Component, OnInit } from '@angular/core';
import {CabinetService} from '../../../services/cabinet.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orders-cabinet',
  templateUrl: './orders-cabinet.component.html',
  styleUrls: ['./orders-cabinet.component.scss']
})
export class OrdersCabinetComponent implements OnInit {
  orders = [];
  currentPage =  0;
  currentSize = 4;
  totalElements: number;
  totalPages: number;
  itemName: string;

  constructor(private cabinetService: CabinetService,
              private router: Router) { }

  ngOnInit(): void {
    this.cabinetService.getAllOrders(this.currentPage, this.currentSize).subscribe(value => {
      this.orders = value.orders;
      this.totalElements = value.totalElements;
      this.totalPages = value.totalPages;
      console.log(this.orders);
      console.log(value);
    });
  }
  getCurrentOrderEditView(id: any): void {
    this.router.navigate(['admin/order', id]);
  }

  prevPage(): void {
    if (this.getItemsByName() !== false){
      if (this.currentPage >= 1) {
        this.cabinetService.searchOrdersByName(this.itemName, this.currentPage -= 1, this.currentSize)
          .subscribe(value => this.orders = value.orders);
      }
    }else {
      if (this.currentPage >= 1){
        this.cabinetService.getAllOrders(this.currentPage -= 1, this.currentSize)
          .subscribe(value => this.orders = value.orders);
      }
    }
  }

  nextPage(): void {
    if (this.getItemsByName() !== false){
      if (this.currentPage < this.totalPages - 1) {
        this.cabinetService.searchOrdersByName(this.itemName, this.currentPage += 1, this.currentSize)
          .subscribe(value => this.orders = value.orders);
      }
    }else {
      if (this.currentPage < this.totalPages - 1){
        this.cabinetService.getAllOrders(this.currentPage += 1, this.currentSize)
          .subscribe(value => this.orders = value.orders);
      }
    }
  }

  selectedOption(value: any): void {
    this.currentSize = +value.value;
    this.cabinetService.getAllOrders(this.currentPage, this.currentSize).subscribe(values => {
      this.orders = values.orders;
      this.totalPages = values.totalPages;
    });
  }

  getItemsByName(): boolean {
    if (this.itemName) {
      this.cabinetService.searchOrdersByName(this.itemName, this.currentPage, this.currentSize).subscribe(value => {
        this.orders = value.orders;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
      });
    }
    return !(this.itemName === '' || this.itemName === undefined);
  }

}
