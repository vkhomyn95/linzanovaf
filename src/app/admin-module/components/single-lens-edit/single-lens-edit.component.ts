import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {lensesType, lensesProducer, lensesBrand, lenseQuantity, correctionType, lenseMaterial} from '../../../constants/lense/lenses';
import {CabinetService} from '../../../services/cabinet.service';
import {ActivatedRoute} from '@angular/router';
import {UpdateLens} from '../../../models/lense/Lens';
import {BroadcastService} from '../../../services/components-data/broadcast.service';
import {LensService} from '../../../services/lens.service';

@Component({
  selector: 'app-single-lens-edit',
  templateUrl: './single-lens-edit.component.html',
  styleUrls: ['./single-lens-edit.component.scss']
})
export class SingleLensEditComponent implements OnInit {
  updateForm: FormGroup;
  lTypeList; lProducerList; lBrandList; lQuantityList; lCorrectionList; lMaterialList;
  errorResponse = []; successResponse = false; images = []; id: number; fileToUpload: File = null;

  constructor(private cabinetService: CabinetService,
              private activatedRoute: ActivatedRoute,
              private broadcastService: BroadcastService,
              private lensService: LensService) {
    this.updateForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      avgPriceInUkraine: new FormControl(''),
      quantity: new FormControl(''),
      mediaField: new FormControl(),
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
      hasDefaultBC: new FormControl(false, [Validators.required]),
      hasAxis: new FormControl(false),
      defaultDiameter: new FormControl(),
      hasCylinder: new FormControl(false),
      defaultBC: new FormControl(''),
      availability: new FormControl(false)
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
        this.images = value.photo;
        this.id = value.id;
        for (const param of Object.keys(this.updateForm.controls)){
          for (const lens in value) {
            if (param === lens){
              this.updateForm.get(param).setValue(value[param]);
            }
          }
        }
      });
    });
  }

  updateLens(): void {
    const lens: UpdateLens = this.updateForm.value;
    this.activatedRoute.params.subscribe(lensId => {
      return this.cabinetService.updateLens(lensId.id, lens).toPromise()
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

  preUploadPhoto(e): void {
    if (this.images.length < 2){
      this.fileToUpload = e.target.files;
    }
  }


  removeError(): void {
    setTimeout(() => {
      this.errorResponse.splice(-1, 1);
      console.log(this.errorResponse);
    }, 5000);
  }

  uploadImage(): void {
    const file: File = this.fileToUpload[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    this.lensService.addLensImage(this.id, formData, headers).toPromise()
      .then(response => {
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
  }
}
