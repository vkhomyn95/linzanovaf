import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CabinetService} from '../../../services/cabinet.service';
import {ActivatedRoute} from '@angular/router';
import {BroadcastService} from '../../../services/components-data/broadcast.service';
import {UpdateOffer} from '../../../models/special-offers/SpecialOffer';

@Component({
  selector: 'app-single-offer-edit',
  templateUrl: './single-offer-edit.component.html',
  styleUrls: ['./single-offer-edit.component.scss']
})
export class SingleOfferEditComponent implements OnInit {
  updateForm: FormGroup;
  errorResponse = []; successResponse = false;

  constructor(private cabinetService: CabinetService,
              private activatedRoute: ActivatedRoute,
              private broadcastService: BroadcastService) {
    this.updateForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      avgPriceInUkraine: new FormControl(''),
      firstItemName: new FormControl(''),
      secondItemName: new FormControl(''),
      firstItemQuanity: new FormControl(''),
      secondItemQuanity: new FormControl(''),
      hasDefaultBC: new FormControl(false, [Validators.required]),
      hasAxis: new FormControl(false),
      defaultDiameter: new FormControl(),
      hasCylinder: new FormControl(false),
      defaultBC: new FormControl(''),
      activeStatus: new FormControl(false)
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( offerId => {
      this.cabinetService.getOffer(offerId.id).subscribe(value => {
        for (const param of Object.keys(this.updateForm.controls)){
          for (const offer in value) {
            if (param === offer){
              this.updateForm.get(param).setValue(value[param]);
            }
          }
        }
      });
    });
  }

  updateOffer(): void {
    const offer: UpdateOffer = this.updateForm.value;
    this.activatedRoute.params.subscribe(lensId => {
      return this.cabinetService.updateSpecialOffer(lensId.id, offer).toPromise()
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
