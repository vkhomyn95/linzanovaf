import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CabinetService} from '../../../services/cabinet.service';

@Component({
  selector: 'app-solutions-cabinet',
  templateUrl: './solutions-cabinet.component.html',
  styleUrls: ['./solutions-cabinet.component.scss']
})
export class SolutionsCabinetComponent implements OnInit {
  solutions = [];
  currentPage =  0;
  currentSize = 2;
  totalElements: number;
  totalPages: number;
  itemName: string;

  constructor(private cabinetService: CabinetService,
              private router: Router) { }

  ngOnInit(): void {
    this.cabinetService.getAllSolutions(this.currentPage, this.currentSize).subscribe(value => {
      this.solutions = value.solutions;
      this.totalElements = value.totalElements;
      this.totalPages = value.totalPages;
      console.log(value);
    });
    console.log(this.getItemsByName());
    console.log(this.itemName);
  }
  getCurrentSolutionEditView(id: any): void {
    this.router.navigate(['admin/products/solutions', id]);
  }

  prevPage(): void {
    if (this.getItemsByName() !== false){
      if (this.currentPage >= 1) {
        this.cabinetService.searchSolutionsByName(this.itemName, this.currentPage -= 1, this.currentSize)
          .subscribe(value => this.solutions = value.solutions);
      }
    }else {
      if (this.currentPage >= 1){
        this.cabinetService.getAllSolutions(this.currentPage -= 1, this.currentSize)
          .subscribe(value => this.solutions = value.solutions);
      }
    }
  }

  nextPage(): void {
    if (this.getItemsByName() !== false){
      if (this.currentPage < this.totalPages - 1) {
        this.cabinetService.searchSolutionsByName(this.itemName, this.currentPage += 1, this.currentSize)
          .subscribe(value => this.solutions = value.solutions);
      }
    }else {
      if (this.currentPage < this.totalPages - 1){
        this.cabinetService.getAllSolutions(this.currentPage += 1, this.currentSize)
          .subscribe(value => this.solutions = value.solutions);
      }
    }
  }

  selectedOption(value: any): void {
    this.currentSize = +value.value;
    this.cabinetService.getAllSolutions(this.currentPage, this.currentSize).subscribe(values => {
      this.solutions = values.solutions;
      this.totalPages = values.totalPages;
    });
  }

  getItemsByName(): boolean {
    if (this.itemName) {
      this.cabinetService.searchSolutionsByName(this.itemName, this.currentPage, this.currentSize).subscribe(value => {
        this.solutions = value.solutions;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
      });
    }
    return !(this.itemName === '' || this.itemName === undefined);
  }
}
