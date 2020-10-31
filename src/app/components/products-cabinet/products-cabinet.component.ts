import { Component, OnInit } from '@angular/core';
import {CabinetService} from '../../services/cabinet.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products-cabinet',
  templateUrl: './products-cabinet.component.html',
  styleUrls: ['./products-cabinet.component.scss']
})
export class ProductsCabinetComponent implements OnInit {
  lensesCount: number;
  solutionCount: number;
  careCount: number;

  constructor(private cabinetService: CabinetService,
              private router: Router) { }

  ngOnInit(): void {
    this.cabinetService.getLensesCount().subscribe(value => this.lensesCount = value);
    this.cabinetService.getSolutionsCount().subscribe(value => this.solutionCount = value);
    this.cabinetService.getCareCount().subscribe(value => this.careCount = value);
  }


  getAllLenses(): void {
    this.router.navigate(['admin/products/lenses']);
  }

  getAllSolutions(): void {
    this.router.navigate(['admin/products/solutions']);
  }

  getAllEyeCare(): void {
    this.router.navigate(['admin/products/cares']);
  }
}
