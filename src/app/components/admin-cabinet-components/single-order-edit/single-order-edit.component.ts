import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CabinetService} from '../../../services/cabinet.service';
import {FormControl, FormGroup} from '@angular/forms';
import {UpdateOrder} from '../../../models/order/Order';

@Component({
  selector: 'app-single-order-edit',
  templateUrl: './single-order-edit.component.html',
  styleUrls: ['./single-order-edit.component.scss']
})
export class SingleOrderEditComponent implements OnInit {
  updateForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private cabinetService: CabinetService) {
    this.updateForm = new FormGroup({
      createdAt: new FormControl(''),
      totalSumm: new FormControl(''),
      lastName: new FormControl(''),
      firstName: new FormControl(''),
      patronymic: new FormControl(''),
      phone: new FormControl(''),
      customerComment: new FormControl(''),
      meestTrackingId: new FormControl(''),
      dpdTrackingId: new FormControl(''),
      novaPoshtaTTN: new FormControl(''),
      alensaId: new FormControl(''),
      receivedInMesstPoland: new FormControl()
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(orderId => {
      this.cabinetService.getOrder(orderId.id).subscribe(value => {
        for (const param of Object.keys(this.updateForm.controls)) {
          for (const order in value) {
            if (param === order){
              this.updateForm.get(param).setValue(value[param]);
            }
          }
        }
        console.log(value);
      });
    });
  }

  updateOrder(): void {
    const order: UpdateOrder = this.updateForm.value;
    console.log(order);
    // this.activatedRoute.params.subscribe(orderId => {
    //   return this.cabinetService.updateUser(orderId.id, order).subscribe(value => console.log(value));
    // });
  }

}
