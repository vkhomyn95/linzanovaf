import {Component, Input, OnInit} from '@angular/core';
import {navListLensBrand, navListLensFilterCorrection,
  navListLensFilterType, navListLensMaterial, navListLensProducer, navListLensQuantity} from '../../constants/nav-filter/lensFilter';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() category;
  navListLensBrand; navListLensFilterCorrection; navListLensFilterType; navListLensMaterial; navListLensProducer; navListLensQuantity;

  constructor(private router: Router) {
    this.navListLensBrand = navListLensBrand; this.navListLensFilterCorrection = navListLensFilterCorrection;
    this.navListLensFilterType = navListLensFilterType; this.navListLensMaterial = navListLensMaterial;
    this.navListLensProducer = navListLensProducer; this.navListLensQuantity = navListLensQuantity;
  }

  ngOnInit(): void {
  }

  filterLens(params: any): void {
    if (params.category === 1){
      this.router.navigate(['lens/filter'], {queryParams: {colName: params.col, name: params.name}});
    }
  }
}
