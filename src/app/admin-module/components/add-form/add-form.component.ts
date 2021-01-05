import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {navOption} from '../../../constants/nav/navOptions';
import {solutionBrand, solutionValue, solutionProducer, solutionType} from '../../../constants/solution/solution';
import {lensesType, lensesProducer, lensesBrand, lenseQuantity, correctionType, lenseMaterial} from '../../../constants/lense/lenses';
import {careproducer} from '../../../constants/care/care';
import {LensService} from '../../../services/lens.service';
import {Solution} from '../../../models/solution/Solution';
import {Lens} from '../../../models/lense/Lens';
import {Drops} from '../../../models/drops/Drops';
import {SpecialOffer} from '../../../models/special-offers/SpecialOffer';
import {BroadcastService} from '../../../services/components-data/broadcast.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {
  addSolutionForm: FormGroup;
  navOptions; currentOption;
  sTypeList; sProducerList; sBrandList; sValueList; lTypeList; lProducerList; lBrandList; lQuantityList; lCorrectionList; lMaterialList;
  cProducerList;
  errorResponse = []; successResponse = false;
  constructor(private lensService: LensService,
              private broadcastService: BroadcastService) {
    this.navOptions = navOption;
    this.addSolutionForm = new FormGroup({
      pName: new FormControl(''),
      pPrice: new FormControl(''),
      sType: new FormControl(),
      sProducer: new FormControl(),
      sBrand: new FormControl(),
      sValue: new FormControl(),
      pPhoto: new FormControl(),
      sDate: new FormControl(''),
      sTdt: new FormControl(''),
      sZip: new FormControl(''),
      lType: new FormControl(),
      lProducer: new FormControl(),
      lBrand: new FormControl(),
      lCorrectionType: new FormControl(),
      lQuantity: new FormControl(),
      lMaterial: new FormControl(),
      lSleep: new FormControl(''),
      lDiametr: new FormControl(),
      lWater: new FormControl(),
      lHasDefaultCurvature: new FormControl(false, [Validators.required]),
      lHasAxis: new FormControl(false),
      lHasCylinder: new FormControl(false),
      lCurvature: new FormControl(),
      ukrPrice: new FormControl(),
      lCylF: new FormControl(),
      lCylT: new FormControl(),
      lAxisF: new FormControl(),
      lAxisT: new FormControl(),
      cValue: new FormControl(''),
      offerFirstItemName: new FormControl(''),
      offerSecondItemName: new FormControl(''),
      offerFirstItemQuantity: new FormControl(''),
      offerSecondItemQuantity: new FormControl(''),
      activeStatus: new FormControl(),
      cproducer: new FormControl(''),
      description: new FormControl(''),
      availability: new FormControl(false)
    });
    this.sTypeList = solutionType;
    this.sProducerList = solutionProducer;
    this.sBrandList = solutionBrand;
    this.sValueList = solutionValue;
    this.lTypeList = lensesType;
    this.lProducerList = lensesProducer;
    this.lBrandList = lensesBrand;
    this.lQuantityList = lenseQuantity;
    this.lCorrectionList = correctionType;
    this.lMaterialList = lenseMaterial;
    this.cProducerList = careproducer;
  }

  ngOnInit(): void {
    this.currentOption = this.navOptions[0].id;
  }

  changeAddView(tabChange): void {
    this.currentOption = tabChange.id;
    for (const element of this.navOptions){
      element.default = false;
    }
    tabChange.default = true;
  }

  addLens(): object {
    if (this.addSolutionForm.controls.pName.value !== ''
      && this.addSolutionForm.controls.pPrice.value !== ''
      && this.addSolutionForm.controls.lType.value.name !== ''
      && this.addSolutionForm.controls.lProducer.value.name !== ''
      && this.addSolutionForm.controls.lBrand.value.name !== ''
      && this.addSolutionForm.controls.lQuantity.value.value !== ''
      && this.addSolutionForm.controls.lCorrectionType.value.value !== ''
      && this.addSolutionForm.controls.lMaterial.value.name !== ''
      && this.addSolutionForm.controls.lWater.value !== '') {
      const lens: Lens = {
        name: this.addSolutionForm.controls.pName.value,
        price: this.addSolutionForm.controls.pPrice.value,
        lenseType: this.addSolutionForm.controls.lType.value.name,
        lenseProducer: this.addSolutionForm.controls.lProducer.value.name,
        lenseBrand: this.addSolutionForm.controls.lBrand.value.name,
        quantity: this.addSolutionForm.controls.lQuantity.value.value,
        lenseCorrection: this.addSolutionForm.controls.lCorrectionType.value.name,
        lenseMaterial: this.addSolutionForm.controls.lMaterial.value.name,
        description: this.addSolutionForm.controls.description.value,
        lenseWater: this.addSolutionForm.controls.lWater.value,
        lenseSleep: this.addSolutionForm.controls.lSleep.value,
        sdate: this.addSolutionForm.controls.sDate.value,
        stdt: this.addSolutionForm.controls.sTdt.value,
        hasDefaultBC: this.addSolutionForm.controls.lHasDefaultCurvature.value,
        defaultBC: this.addSolutionForm.controls.lCurvature.value,
        hasAxis: this.addSolutionForm.controls.lHasAxis.value,
        hasCylinder: this.addSolutionForm.controls.lHasCylinder.value,
        defaultDiameter: this.addSolutionForm.controls.lDiametr.value,
        avgPriceInUkraine: this.addSolutionForm.controls.ukrPrice.value,
        availability: this.addSolutionForm.controls.availability.value
      };
      console.log(lens);
      return this.lensService.addLens(lens).toPromise()
        .then((response) => {
          if (response){
            setTimeout(() => {
              this.successResponse = true;
            }, 3000);
            this.successResponse = false;
            this.addSolutionForm.reset();
          }else {
            this.broadcastService.http404.asObservable().subscribe(value => {
              if (value === true){
                this.errorResponse.push('Повторіть спробу пізніше');
                this.removeError();
              }
            });
          }
        });
    }else {
      this.errorResponse.push('Заповніть усі поля коректно!');
      this.removeError();
    }
  }

  addSolution(): object {
    if (this.addSolutionForm.controls.pName.value !== ''
      && this.addSolutionForm.controls.pPrice.value !== ''
      && this.addSolutionForm.controls.sType.value.name !== ''
      && this.addSolutionForm.controls.sProducer.value.name !== ''
      && this.addSolutionForm.controls.sBrand.value.name !== ''
      && this.addSolutionForm.controls.sValue.value.value !== '') {
      const solution: Solution = {
        name: this.addSolutionForm.controls.pName.value,
        price: this.addSolutionForm.controls.pPrice.value,
        avgPriceInUkraine: this.addSolutionForm.controls.ukrPrice.value,
        solutionType: this.addSolutionForm.controls.sType.value.name,
        solutionProducer: this.addSolutionForm.controls.sProducer.value.name,
        solutionBrand: this.addSolutionForm.controls.sBrand.value.name,
        solutionValue: this.addSolutionForm.controls.sValue.value.value,
        description: this.addSolutionForm.controls.description.value,
        sdate: this.addSolutionForm.controls.sDate.value,
        stdt: this.addSolutionForm.controls.sTdt.value,
        boolHyaluronate: this.addSolutionForm.controls.sZip.value,
        availability: this.addSolutionForm.controls.availability.value
      };
      return this.lensService.addSolution(solution).toPromise()
        .then((response) => {
          if (response){
            setTimeout(() => {
              this.successResponse = true;
            }, 3000);
            this.successResponse = false;
            this.addSolutionForm.reset();
          }else {
            this.broadcastService.http404.asObservable().subscribe(value => {
              if (value === true){
                this.errorResponse.push('Повторіть спробу пізніше');
                this.removeError();
              }
            });
          }
        });
    }else {
      this.errorResponse.push('Заповніть усі поля коректно!');
      this.removeError();
    }
  }

  addLensDrops(): object {
    if (this.addSolutionForm.controls.pName.value !== ''
      && this.addSolutionForm.controls.pPrice.value !== ''
      && this.addSolutionForm.controls.cproducer.value.name !== ''
      && this.addSolutionForm.controls.cValue.value !== ''){
      const drops: Drops = {
        name: this.addSolutionForm.controls.pName.value,
        price: this.addSolutionForm.controls.pPrice.value,
        cproducer: this.addSolutionForm.controls.cproducer.value,
        cvalue: this.addSolutionForm.controls.cValue.value,
        description: this.addSolutionForm.controls.description.value,
        sdate: this.addSolutionForm.controls.sDate.value,
        stdt: this.addSolutionForm.controls.sTdt.value,
        avgPriceInUkraine: this.addSolutionForm.controls.ukrPrice.value
      };
      return this.lensService.addLensDrops(drops).toPromise()
        .then((response) => {
          if (response){
            setTimeout(() => {
              this.successResponse = true;
            }, 3000);
            this.successResponse = false;
            this.addSolutionForm.reset();
          }else {
            this.broadcastService.http404.asObservable().subscribe(value => {
              if (value === true){
                this.errorResponse.push('Повторіть спробу пізніше');
                this.removeError();
              }
            });
          }
        });
    }else {
      this.errorResponse.push('Заповніть усі поля коректно!');
      this.removeError();
    }
  }

  addHotProposition(): object {
    if (this.addSolutionForm.controls.pName.value !== ''
      && this.addSolutionForm.controls.pPrice.value !== ''
      && this.addSolutionForm.controls.offerFirstItemName.value !== ''
      && this.addSolutionForm.controls.offerSecondItemName.value !== ''
      && this.addSolutionForm.controls.offerFirstItemQuantity.value !== ''
      && this.addSolutionForm.controls.offerSecondItemQuantity.value !== ''){
      const offer: SpecialOffer = {
        name: this.addSolutionForm.controls.pName.value,
        price: this.addSolutionForm.controls.pPrice.value,
        avgPriceInUkraine: this.addSolutionForm.controls.ukrPrice.value,
        firstItemName: this.addSolutionForm.controls.offerFirstItemName.value,
        secondItemName: this.addSolutionForm.controls.offerSecondItemName.value,
        firstItemQuanity: this.addSolutionForm.controls.offerFirstItemQuantity.value,
        secondItemQuanity: this.addSolutionForm.controls.offerSecondItemQuantity.value,
        hasDefaultBC: this.addSolutionForm.controls.lHasDefaultCurvature.value,
        defaultBC: this.addSolutionForm.controls.lCurvature.value,
        hasAxis: this.addSolutionForm.controls.lHasAxis.value,
        hasCylinder: this.addSolutionForm.controls.lHasCylinder.value,
        defaultDiameter: this.addSolutionForm.controls.lDiametr.value,
        activeStatus: this.addSolutionForm.controls.activeStatus.value
      };
      return this.lensService.addSpecialOffer(offer).toPromise()
        .then((response) => {
          if (response){
            setTimeout(() => {
              this.successResponse = true;
            }, 3000);
            this.successResponse = false;
            this.addSolutionForm.reset();
          }else {
            this.broadcastService.http404.asObservable().subscribe(value => {
              if (value === true){
                this.errorResponse.push('Повторіть спробу пізніше');
                this.removeError();
              }
            });
          }
        });
    }else {
      this.errorResponse.push('Заповніть усі поля коректно!');
      this.removeError();
    }
  }

  removeError(): void {
    setTimeout(() => {
      this.errorResponse.splice(-1, 1);
      console.log(this.errorResponse);
    }, 5000);
  }
}
