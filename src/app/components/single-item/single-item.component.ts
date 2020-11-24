import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CabinetService} from '../../services/cabinet.service';
import {Drops} from '../../models/drops/Drops';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {
  loader = true;
  care: Drops;

  constructor(private activatedRoute: ActivatedRoute,
              private cabinetService: CabinetService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(urlId => {
      this.cabinetService.getCare(history.state.stateId).subscribe(careValue => {
          this.care = careValue;
          this.loader = false;
          console.log(this.care);
        }
      );
    });
  }

}
