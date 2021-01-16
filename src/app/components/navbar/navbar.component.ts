import {Component, Input, OnInit} from '@angular/core';
import {navListLensBrand, navListLensFilterCorrection,
  navListLensFilterType, navListLensMaterial, navListLensProducer, navListLensQuantity} from '../../constants/nav-filter/lensFilter';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() category;
  navListLensBrand; navListLensFilterCorrection; navListLensFilterType; navListLensMaterial; navListLensProducer; navListLensQuantity;

  constructor() {
    this.navListLensBrand = navListLensBrand; this.navListLensFilterCorrection = navListLensFilterCorrection;
    this.navListLensFilterType = navListLensFilterType; this.navListLensMaterial = navListLensMaterial;
    this.navListLensProducer = navListLensProducer; this.navListLensQuantity = navListLensQuantity;
  }

  ngOnInit(): void {
  }

}
