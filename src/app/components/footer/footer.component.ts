import { Component, OnInit } from '@angular/core';
import {lensesType} from '../../constants/lense/lenses';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  lenseTypeList;

  constructor() {
    this.lenseTypeList = lensesType;
  }

  ngOnInit(): void {
  }

}
