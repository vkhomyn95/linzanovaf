import { Component, OnInit } from '@angular/core';
import {CabinetService} from '../../../services/cabinet.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lenses-cabinet',
  templateUrl: './lenses-cabinet.component.html',
  styleUrls: ['./lenses-cabinet.component.scss']
})
export class LensesCabinetComponent implements OnInit {
  lenses = [];
  currentPage =  0;
  currentSize = 2;
  totalElements: number;
  totalPages: number;
  itemName: string;

  constructor(private cabinetService: CabinetService,
              private router: Router) { }

  ngOnInit(): void {
    this.cabinetService.getAllLenses(this.currentPage, this.currentSize).subscribe(value => {
      this.lenses = value.lenses;
      this.totalElements = value.totalElements;
      this.totalPages = value.totalPages;
    });
  }

  getCurrentLensEditView(id: any): void {
    this.router.navigate(['admin/products/lenses', id]);
  }

  prevPage(): void {
    if (this.getItemsByName() !== false){
      if (this.currentPage >= 1) {
        this.cabinetService.searchLensesByName(this.itemName, this.currentPage -= 1, this.currentSize)
          .subscribe(value => this.lenses = value.lenses);
      }
    }else {
      if (this.currentPage >= 1){
        this.cabinetService.getAllLenses(this.currentPage -= 1, this.currentSize)
          .subscribe(value => this.lenses = value.lenses);
      }
    }
  }

  nextPage(): void {
    if (this.getItemsByName() !== false){
      if (this.currentPage < this.totalPages - 1) {
        this.cabinetService.searchLensesByName(this.itemName, this.currentPage += 1, this.currentSize)
          .subscribe(value => this.lenses = value.lenses);
      }
    }else {
      if (this.currentPage < this.totalPages - 1){
        this.cabinetService.getAllLenses(this.currentPage += 1, this.currentSize)
          .subscribe(value => this.lenses = value.lenses);
      }
    }
  }

  selectedOption(value: any): void {
    this.currentSize = +value.value;
    this.cabinetService.getAllLenses(this.currentPage, this.currentSize).subscribe(values => {
      this.lenses = values.lenses;
      this.totalPages = values.totalPages;
    });
  }

  getItemsByName(): boolean {
    if (this.itemName) {
      this.cabinetService.searchLensesByName(this.itemName, this.currentPage, this.currentSize).subscribe(value => {
        this.lenses = value.lenses;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
      });
    }
    return !(this.itemName === '' || this.itemName === undefined);
  }
}
