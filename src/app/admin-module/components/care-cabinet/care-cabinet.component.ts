import { Component, OnInit } from '@angular/core';
import {CabinetService} from '../../../services/cabinet.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-care-cabinet',
  templateUrl: './care-cabinet.component.html',
  styleUrls: ['./care-cabinet.component.scss']
})
export class CareCabinetComponent implements OnInit {
  cares = [];
  currentPage =  0;
  currentSize = 8;
  totalElements: number;
  totalPages: number;
  itemName: string;

  constructor(private cabinetService: CabinetService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.cabinetService.getAllCares(this.currentPage, this.currentSize).subscribe(value => {
      this.cares = value.drops;
      this.totalElements = value.totalElements;
      this.totalPages = value.totalPages;
    });
  }

  getCurrentCareEditView(id: number): void {
    this.router.navigate(['/admin/products/cares', id]);
  }

  prevPage(): void {
    if (this.getItemsByName()){
      if (this.currentPage >= 1) {
        this.cabinetService.searchCaresByName(this.itemName, this.currentPage -= 1, this.currentSize)
          .subscribe(value => this.cares = value.drops);
      }
    }
    if (this.currentPage >= 1){
      this.cabinetService.getAllCares(this.currentPage -= 1, this.currentSize).subscribe(value => this.cares = value.drops);
    }
  }

  nextPage(): void {
    if (this.getItemsByName()){
      if (this.currentPage < this.totalPages - 1) {
        this.cabinetService.searchCaresByName(this.itemName, this.currentPage += 1, this.currentSize)
          .subscribe(value => this.cares = value.drops);
        }
      }
    if (this.currentPage < this.totalPages - 1){
      this.cabinetService.getAllCares(this.currentPage += 1, this.currentSize).subscribe(value => this.cares = value.drops);
    }
  }

  selectedOption(value: any): void {
    this.currentSize = +value.value;
    this.cabinetService.getAllCares(this.currentPage, this.currentSize).subscribe(values => {
      this.cares = values.drops;
      this.totalPages = values.totalPages;
    });
  }

  getItemsByName(): boolean {
    if (this.itemName) {
      this.cabinetService.searchCaresByName(this.itemName, this.currentPage, this.currentSize).subscribe(value => {
        this.cares = value.drops;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
      });
    }
    return !(this.itemName === '' || this.itemName === undefined);
  }
}
