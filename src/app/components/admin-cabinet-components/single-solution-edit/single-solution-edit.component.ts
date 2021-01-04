import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {CabinetService} from '../../../services/cabinet.service';
import {solutionBrand, solutionProducer, solutionType, solutionValue} from '../../../constants/solution/solution';
import {UpdateSolution} from '../../../models/solution/Solution';
import {BroadcastService} from '../../../services/components-data/broadcast.service';

@Component({
  selector: 'app-single-solution-edit',
  templateUrl: './single-solution-edit.component.html',
  styleUrls: ['./single-solution-edit.component.scss']
})
export class SingleSolutionEditComponent implements OnInit {
  updateForm: FormGroup;
  sTypeList; sProducerList; sBrandList; sValueList;
  errorResponse = []; successResponse = false;

  constructor(private activatedRoute: ActivatedRoute,
              private cabinetService: CabinetService,
              private broadcastService: BroadcastService) {
    this.updateForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      avgPriceInUkraine: new FormControl(''),
      solutionBrand: new FormControl(''),
      solutionProducer: new FormControl(''),
      solutionType: new FormControl(''),
      solutionValue: new FormControl(''),
      stdt: new FormControl(''),
      sdate: new FormControl(''),
      description: new FormControl(''),
      boolHyaluronate: new FormControl(''),
      availability: new FormControl(false),
    });
    this.sTypeList = solutionType;
    this.sProducerList = solutionProducer;
    this.sBrandList = solutionBrand;
    this.sValueList = solutionValue;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( solutionId => {
      this.cabinetService.getSolution(solutionId.id).subscribe(value => {
        console.log(value);
        for (const param of Object.keys(this.updateForm.controls)){
          for (const solution in value) {
            if (param === solution){
              this.updateForm.get(param).setValue(value[param]);
            }
          }
        }
      });
    });
  }
  updateSolution(): void {
    const solution: UpdateSolution = this.updateForm.value;
    this.activatedRoute.params.subscribe(solutionId => {
      return this.cabinetService.updateSolution(solutionId.id, solution).toPromise()
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
