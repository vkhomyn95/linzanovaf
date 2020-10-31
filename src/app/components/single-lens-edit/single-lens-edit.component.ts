import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {lensesType, lensesProducer, lensesBrand, lenseQuantity, correctionType, lenseMaterial} from '../../constants/lense/lenses';
import {CabinetService} from '../../services/cabinet.service';
import {ActivatedRoute} from '@angular/router';
import {UpdateLens} from '../../models/lense/Lens';

@Component({
  selector: 'app-single-lens-edit',
  templateUrl: './single-lens-edit.component.html',
  styleUrls: ['./single-lens-edit.component.scss']
})
export class SingleLensEditComponent implements OnInit {
  updateForm: FormGroup;
  lTypeList; lProducerList; lBrandList; lQuantityList; lCorrectionList; lMaterialList;

  constructor(private cabinetService: CabinetService,
              private activatedRoute: ActivatedRoute) {
    this.updateForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      quantity: new FormControl(''),
      lenseType: new FormControl(''),
      lenseProducer: new FormControl(''),
      lenseBrand: new FormControl(''),
      lenseCorrection: new FormControl(''),
      lenseMaterial: new FormControl(''),
      description: new FormControl(''),
      sdate: new FormControl(''),
      stdt: new FormControl(''),
      lenseSleep: new FormControl(''),
      lenseShelfLife: new FormControl(''),
      lenseWater: new FormControl(''),
      // userId: new FormControl(1)
    });
    this.lTypeList = lensesType;
    this.lProducerList = lensesProducer;
    this.lBrandList = lensesBrand;
    this.lQuantityList = lenseQuantity;
    this.lCorrectionList = correctionType;
    this.lMaterialList = lenseMaterial;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( lensId => {
      this.cabinetService.getLens(lensId.id).subscribe(value => {
        for (const param of Object.keys(this.updateForm.controls)){
          for (const lens in value) {
            if (param === lens){
              this.updateForm.get(param).setValue(value[param]);
            }
          }
        }
      });
    });
    console.log(this.updateForm);
  }

  updateLens(): void {
    const lens: UpdateLens = this.updateForm.value;
    console.log(lens);
    this.activatedRoute.params.subscribe(lensId => {
      return this.cabinetService.updateLens(lensId.id, 1, lens).subscribe(value => console.log(value));
    });
  }
}
