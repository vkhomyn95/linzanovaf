import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {navOption} from '../../../constants/nav/navOptions';
import {solutionBrand, solutionValue, solutionProducer, solutionType} from '../../../constants/solution/solution';
import {lensesType, lensesProducer, lensesBrand, lenseQuantity, correctionType, lenseMaterial} from '../../../constants/lense/lenses';
import {careproducer} from '../../../constants/care/care';
import {LensService} from '../../../services/lens.service';
import {Solution} from '../../../models/solution/Solution';
import {Lens} from '../../../models/lense/Lens';
import {Drops} from '../../../models/drops/Drops';
import {SpecialOffer} from '../../../models/special-offers/SpecialOffer';

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
  errorResponse = [];
  constructor(private lensService: LensService) {
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
      lCurvature: new FormControl(),
      ukrPrice: new FormControl(),
      lCylF: new FormControl(),
      lCylT: new FormControl(),
      lAxisF: new FormControl(),
      lAxisT: new FormControl(),
      cValue: new FormControl(''),
      offerLink: new FormControl(''),
      offerFirstItemName: new FormControl(''),
      offerSecondItemName: new FormControl(''),
      offerFirstItemQuantity: new FormControl(''),
      offerSecondItemQuantity: new FormControl(''),
      activeStatus: new FormControl(),
      cproducer: new FormControl(''),
      description: new FormControl('')
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
        defaultBC: this.addSolutionForm.controls.lCurvature.value,
        defaultDiameter: this.addSolutionForm.controls.lDiametr.value,
        avgPriceInUkraine: this.addSolutionForm.controls.ukrPrice.value
      };
      return this.lensService.addLens(lens).subscribe(value => console.log(value), error => {
        this.errorResponse.push(error.error);
        this.removeError();
      });
    }else {
      this.errorResponse.push('Заповніть усі поля коректно!');
      this.removeError();
    }
  }

  addSolution(): object {
    console.log(this.addSolutionForm);
    if (this.addSolutionForm.controls.pName.value !== ''
      && this.addSolutionForm.controls.pPrice.value !== ''
      && this.addSolutionForm.controls.sType.value.name !== ''
      && this.addSolutionForm.controls.sProducer.value.name !== ''
      && this.addSolutionForm.controls.sBrand.value.name !== ''
      && this.addSolutionForm.controls.sValue.value.value !== '') {
      const solution: Solution = {
        name: this.addSolutionForm.controls.pName.value,
        price: this.addSolutionForm.controls.pPrice.value,
        solutionType: this.addSolutionForm.controls.sType.value.name,
        solutionProducer: this.addSolutionForm.controls.sProducer.value.name,
        solutionBrand: this.addSolutionForm.controls.sBrand.value.name,
        solutionValue: this.addSolutionForm.controls.sValue.value.value,
        description: this.addSolutionForm.controls.description.value,
        sdate: this.addSolutionForm.controls.sDate.value,
        stdt: this.addSolutionForm.controls.sTdt.value,
        boolHyaluronate: this.addSolutionForm.controls.sZip.value
      };
      return this.lensService.addSolution(solution).subscribe(value => console.log(value), error => {
        this.errorResponse.push(error.error);
        this.removeError();
      });
    }else {
      this.errorResponse.push('Заповніть усі поля коректно!');
      console.log(this.errorResponse);
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
        stdt: this.addSolutionForm.controls.sTdt.value
      };
      console.log(drops)
      return this.lensService.addLensDrops(drops).subscribe(value => console.log(value), error => {
        console.log(drops)
        this.errorResponse.push(error.error);
        this.removeError();
      });
    }else {
      this.errorResponse.push('Заповніть усі поля коректно!');
      this.removeError();
    }
  }

  addHotProposition(): object {
    if (this.addSolutionForm.controls.pName.value !== ''
      && this.addSolutionForm.controls.pPrice.value !== ''
      && this.addSolutionForm.controls.offerLink.value.name !== ''
      && this.addSolutionForm.controls.offerFirstItemName.value !== ''
      && this.addSolutionForm.controls.offerSecondItemName.value !== ''
      && this.addSolutionForm.controls.offerFirstItemQuantity.value !== ''
      && this.addSolutionForm.controls.offerSecondItemQuantity.value !== ''){
      const offer: SpecialOffer = {
        name: this.addSolutionForm.controls.pName.value,
        price: this.addSolutionForm.controls.pPrice.value,
        alensaLink: this.addSolutionForm.controls.offerLink.value,
        firstItemName: this.addSolutionForm.controls.offerFirstItemName.value,
        secondItemName: this.addSolutionForm.controls.offerSecondItemName.value,
        firstItemQuanity: this.addSolutionForm.controls.offerFirstItemQuantity.value,
        secondItemQuanity: this.addSolutionForm.controls.offerSecondItemQuantity.value,
        activeStatus: this.addSolutionForm.controls.activeStatus.value
      };
      console.log(offer)
      return this.lensService.addSpecialOffer(offer).subscribe(value => console.log(value), error => {
        this.errorResponse.push(error.error);
        this.removeError();
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
