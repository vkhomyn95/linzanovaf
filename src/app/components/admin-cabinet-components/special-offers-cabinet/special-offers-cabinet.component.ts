import { Component, OnInit } from '@angular/core';
import {CabinetService} from '../../../services/cabinet.service';
import {log} from 'util';

@Component({
  selector: 'app-special-offers-cabinet',
  templateUrl: './special-offers-cabinet.component.html',
  styleUrls: ['./special-offers-cabinet.component.scss']
})
export class SpecialOffersCabinetComponent implements OnInit {
  offers = [];
  currentPage =  0;
  currentSize = 2;
  totalElements: number;
  totalPages: number;

  constructor(private cabinetService: CabinetService) { }

  ngOnInit(): void {
    this.cabinetService.getAllSpecialOffers(this.currentPage, this.currentSize).subscribe(value => {
      this.offers = value.specials;
      this.totalElements = value.totalElements;
      this.totalPages = value.totalPages;
      console.log(value.specials);
    });
  }

}
