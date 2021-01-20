import {Component, Input, OnInit} from '@angular/core';
import {navListLensBrand, navListLensFilterCorrection,
  navListLensFilterType, navListLensMaterial, navListLensProducer, navListLensQuantity} from '../../constants/nav-filter/lensFilter';
import {navListSolutionBrand, navListBool, navListSolutionProducer, navListSolutionType, navListSolutionValue} from '../../constants/nav-filter/solutionFilter';
import {careListProducer} from '../../constants/nav-filter/careFilter';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() category; isFilterCategory = false;
  navListLensBrand; navListLensFilterCorrection; navListLensFilterType; navListLensMaterial; navListLensProducer; navListLensQuantity;
  navListSolutionBrand; navListBool; navListSolutionProducer; navListSolutionType; navListSolutionValue;
  careListProducer;

  constructor(private router: Router) {
    this.navListLensBrand = navListLensBrand; this.navListLensFilterCorrection = navListLensFilterCorrection;
    this.navListLensFilterType = navListLensFilterType; this.navListLensMaterial = navListLensMaterial;
    this.navListLensProducer = navListLensProducer; this.navListLensQuantity = navListLensQuantity;

    this.navListSolutionBrand = navListSolutionBrand; this.navListSolutionProducer = navListSolutionProducer;
    this.navListBool = navListBool; this.navListSolutionType = navListSolutionType; this.navListSolutionValue = navListSolutionValue;

    this.careListProducer = careListProducer;
  }

  ngOnInit(): void {
  }

  filterLens(params: any): void {
    if (params.category === 1){
      this.router.navigate(['lens/filter'], {queryParams: {colName: params.col, name: params.name}});
    }else if (params.category === 2) {
      this.router.navigate(['solution/filter'], {queryParams: {colName: params.col, name: params.name}});
    }else if (params.category === 0) {
      this.router.navigate(['care/filter'], {queryParams: {colName: params.col, name: params.name}});
    }
  }

  selectCategoryFilter(): void {
    this.isFilterCategory = !this.isFilterCategory;
  }
}
