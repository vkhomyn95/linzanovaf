import { Component, OnInit } from '@angular/core';
import {CabinetService} from '../../../services/cabinet.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-special-offers-cabinet',
  templateUrl: './special-offers-cabinet.component.html',
  styleUrls: ['./special-offers-cabinet.component.scss']
})
export class SpecialOffersCabinetComponent implements OnInit {
  offers = [];
  currentPage =  0;
  currentSize = 5;
  totalElements: number;
  totalPages: number;

  constructor(private cabinetService: CabinetService,
              private router: Router) { }

  ngOnInit(): void {
    this.cabinetService.getAllSpecialOffers(this.currentPage, this.currentSize).subscribe(value => {
      this.offers = value.specials;
      this.totalElements = value.totalElements;
      this.totalPages = value.totalPages;
      console.log(value);
    });
  }

  goEditOffer(id: number): void {
    this.router.navigate(['admin/offers', id]);
  }
}
