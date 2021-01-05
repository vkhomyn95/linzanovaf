import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CabinetService} from '../../../services/cabinet.service';

@Component({
  selector: 'app-user-cabinet-single-order',
  templateUrl: './user-cabinet-single-order.component.html',
  styleUrls: ['./user-cabinet-single-order.component.scss']
})
export class UserCabinetSingleOrderComponent implements OnInit {
  currentOrder;
  loader = true;

  constructor(private activatedRoute: ActivatedRoute,
              private cabinetService: CabinetService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(orderId => {
      this.cabinetService.getOrder(orderId.id).subscribe(value => {
        this.currentOrder = value;
        this.loader = false;
        console.log(value);
      });
    });
  }

}
