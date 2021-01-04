import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {careproducer} from '../../../constants/care/care';
import {CabinetService} from '../../../services/cabinet.service';
import {ActivatedRoute} from '@angular/router';
import {UpdateCare} from '../../../models/drops/Drops';
import {BroadcastService} from '../../../services/components-data/broadcast.service';

@Component({
  selector: 'app-single-care-edit',
  templateUrl: './single-care-edit.component.html',
  styleUrls: ['./single-care-edit.component.scss']
})
export class SingleCareEditComponent implements OnInit {
  updateForm: FormGroup;
  cProducerList;
  errorResponse = []; successResponse = false;

  constructor(private cabinetService: CabinetService,
              private activatedRoute: ActivatedRoute,
              private broadcastService: BroadcastService) {
    this.updateForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      avgPriceInUkraine: new FormControl(''),
      cproducer: new FormControl(''),
      cvalue: new FormControl(''),
      description: new FormControl(''),
      sdate: new FormControl(''),
      stdt: new FormControl(''),
      availability: new FormControl(false),
    });
    this.cProducerList = careproducer;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( careId => {
      this.cabinetService.getCare(careId.id).subscribe(value => {
        for (const param of Object.keys(this.updateForm.controls)){
          for (const care in value) {
            if (param === care){
              this.updateForm.get(param).setValue(value[param]);
            }
          }
        }
      });
    });
  }

  updateCare(): void {
    const care: UpdateCare = this.updateForm.value;
    this.activatedRoute.params.subscribe(careId => {
      return this.cabinetService.updateCare(careId.id, care).toPromise()
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
