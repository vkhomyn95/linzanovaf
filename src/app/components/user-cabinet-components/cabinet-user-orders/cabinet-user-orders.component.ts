import { Component, OnInit } from '@angular/core';
import {CabinetService} from '../../../services/cabinet.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cabinet-user-orders',
  templateUrl: './cabinet-user-orders.component.html',
  styleUrls: ['./cabinet-user-orders.component.scss']
})
export class CabinetUserOrdersComponent implements OnInit {
  loader = true;
  orders = [];
  currentPage =  0;
  currentSize = 4;
  totalElements: number;
  totalPages: number;

  constructor(private cabinetService: CabinetService,
              private router: Router) { }

  ngOnInit(): void {
    this.cabinetService.getAllOrdersByUsername(this.currentPage, this.currentSize).subscribe(value => {
      this.orders = value.orders;
      this.totalElements = value.totalElements;
      this.totalPages = value.totalPages;
      this.loader = false;
      console.log(this.orders);
      console.log(value);
    });
  }

  getCurrentOrderEditView(id: any): void {
    this.router.navigate(['cabinet/orders', id]);
  }

  prevPage(): void {
    if (this.currentPage >= 1){
      this.cabinetService.getAllOrdersByUsername(this.currentPage -= 1, this.currentSize)
        .subscribe(value => this.orders = value.orders);
    }

  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1){
      this.cabinetService.getAllOrdersByUsername(this.currentPage += 1, this.currentSize)
        .subscribe(value => this.orders = value.orders);
    }
  }

  selectedOption(value: any): void {
    this.currentSize = +value.value;
    this.cabinetService.getAllOrders(this.currentPage, this.currentSize).subscribe(values => {
      this.orders = values.orders;
      this.totalPages = values.totalPages;
    });
  }

    disableRouter($event: MouseEvent): void {
        event.stopPropagation();
    }
}
