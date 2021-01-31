import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {navListLensFilterType} from '../../constants/nav-filter/lensFilter';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  lenseTypeList;

  constructor(private router: Router) {
    this.lenseTypeList = navListLensFilterType;
  }

  ngOnInit(): void {
  }

  howToBuy(): void {
    this.router.navigate(['steps']);
  }

  filterLens(lensType: any): void {
    if (lensType.category === 1) {
      this.router.navigate(['lens/filter'], {queryParams: {colName: lensType.col, name: lensType.name}});
    }
  }
}
