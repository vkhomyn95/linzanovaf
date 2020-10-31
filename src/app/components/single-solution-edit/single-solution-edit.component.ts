import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {CabinetService} from '../../services/cabinet.service';
import {solutionBrand, solutionProducer, solutionType, solutionValue} from '../../constants/solution/solution';
import {UpdateLens} from '../../models/lense/Lens';
import {UpdateSolution} from '../../models/solution/Solution';

@Component({
  selector: 'app-single-solution-edit',
  templateUrl: './single-solution-edit.component.html',
  styleUrls: ['./single-solution-edit.component.scss']
})
export class SingleSolutionEditComponent implements OnInit {
  updateForm: FormGroup;
  sTypeList; sProducerList; sBrandList; sValueList;

  constructor(private activatedRoute: ActivatedRoute,
              private cabinetService: CabinetService) {
    this.updateForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      solutionBrand: new FormControl(''),
      solutionProducer: new FormControl(''),
      solutionType: new FormControl(''),
      solutionValue: new FormControl(''),
      stdt: new FormControl(''),
      sdate: new FormControl(''),
      description: new FormControl(''),
      boolHyaluronate: new FormControl('')
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
      return this.cabinetService.updateSolution(solutionId.id, 1, solution).subscribe(value => console.log(value));
    });
  }

}
