import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CabinetService} from '../../../services/cabinet.service';
import {FormControl, FormGroup} from '@angular/forms';
import {UpdateOrder} from '../../../models/order/Order';
import {BroadcastService} from '../../../services/components-data/broadcast.service';

@Component({
  selector: 'app-single-order-edit',
  templateUrl: './single-order-edit.component.html',
  styleUrls: ['./single-order-edit.component.scss']
})
export class SingleOrderEditComponent implements OnInit {
  updateForm: FormGroup;
  errorResponse = []; successResponse = false;
  properties;

  constructor(private activatedRoute: ActivatedRoute,
              private cabinetService: CabinetService,
              private broadcastService: BroadcastService) {
    this.updateForm = new FormGroup({
      createdAt: new FormControl(''),
      totalSumm: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      cityName: new FormControl(''),
      deliveryType: new FormControl(''),
      paymentType: new FormControl(''),
      warehouseNumber: new FormControl(''),
      description: new FormControl(''),
      postIndex: new FormControl(''),
      firstName: new FormControl(''),
      patronymic: new FormControl(''),
      phone: new FormControl(''),
      customerComment: new FormControl(''),
      meestTrackingId: new FormControl(''),
      novaPoshtaTTN: new FormControl(''),
      receivedInMesstPoland: new FormControl(),
      priceToPayAfterDelivery: new FormControl(0),
      priceToPayNow: new FormControl(0),
      userEmail: new FormControl(''),
      userId: new FormControl(''),
      canceled: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(orderId => {
      this.cabinetService.getOrder(orderId.id).subscribe(value => {
        this.properties = value.properties.split('\n');
        this.properties.splice(-1, 1);
        for (const param of Object.keys(this.updateForm.controls)) {
          for (const order in value) {
            if (param === order){
              this.updateForm.get(param).setValue(value[param]);
            }
          }
        }

        this.updateForm.get('deliveryType').setValue(value.delivery.deliveryType);
        this.updateForm.get('paymentType').setValue(value.delivery.paymentType);
        this.updateForm.get('cityName').setValue(value.delivery.cityName);
        this.updateForm.get('warehouseNumber').setValue(value.delivery.warehouseNumber);
        this.updateForm.get('description').setValue(value.delivery.description);
        this.updateForm.get('postIndex').setValue(value.delivery.postIndex);
      });
    });
  }

  updateOrder(): void {
    const order: UpdateOrder = this.updateForm.value;
    this.activatedRoute.params.subscribe(orderId => {
      return this.cabinetService.updateOrder(orderId.id, order).toPromise()
        .then((response) => {
          if (response){
            setTimeout(() => {
              this.successResponse = true;
            }, 3000);
            this.successResponse = false;
          }else {
            this.broadcastService.http404.asObservable().subscribe(value => {
              if (value === true){
                this.errorResponse.push('Повторіть спробу пізніше');
                this.removeError();
              }
            });
          }
        });
    });
  }

  removeError(): void {
    setTimeout(() => {
      this.errorResponse.splice(-1, 1);
      console.log(this.errorResponse);
    }, 5000);
  }

}
