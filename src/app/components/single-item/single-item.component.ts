import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CabinetService} from '../../services/cabinet.service';
import {Drops} from '../../models/drops/Drops';
import {Lens} from '../../models/lense/Lens';
import {Solution} from '../../models/solution/Solution';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {
  loader = true;
  care: Drops;
  lens: Lens;
  solution: Solution;
  changeText: boolean;
  tab = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private cabinetService: CabinetService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(urlId => {
      if (this.router.url.indexOf('/lenses') > -1){
        this.cabinetService.getLens(urlId.id).subscribe(lensValue => {
            this.lens = lensValue;
            this.loader = false;
            console.log(this.lens);
          }
        );
      }else if (this.router.url.indexOf('/care') > -1){
        this.cabinetService.getCare(urlId.id).subscribe(careValue => {
            this.care = careValue;
            this.loader = false;
            console.log(this.care);
          }
        );

      }else if (this.router.url.indexOf('/solutions') > -1){
        this.cabinetService.getSolution(urlId.id).subscribe(solutionValue => {
            this.solution = solutionValue;
            this.loader = false;
            console.log(this.solution);
          }
        );
      }
    });
  }

  changeTabView(number): void {
    this.tab = number;
  }
}
