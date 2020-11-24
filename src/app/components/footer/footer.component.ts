import { Component, OnInit } from '@angular/core';
import {lensesType} from '../../constants/lense/lenses';
import {Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  lenseTypeList;

  constructor(private router: Router) {
    this.lenseTypeList = lensesType;
  }

  ngOnInit(): void {
  }

  howToBuy(): void {
    this.router.navigate(['steps']);
  }
}
