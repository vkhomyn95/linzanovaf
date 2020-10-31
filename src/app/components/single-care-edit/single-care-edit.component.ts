import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {careproducer} from '../../constants/care/care';
import {CabinetService} from '../../services/cabinet.service';
import {ActivatedRoute} from '@angular/router';
import {UpdateLens} from '../../models/lense/Lens';
import {UpdateCare} from '../../models/drops/Drops';

@Component({
  selector: 'app-single-care-edit',
  templateUrl: './single-care-edit.component.html',
  styleUrls: ['./single-care-edit.component.scss']
})
export class SingleCareEditComponent implements OnInit {
  updateForm: FormGroup;
  cProducerList;

  constructor(private cabinetService: CabinetService,
              private activatedRoute: ActivatedRoute) {
    this.updateForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      cproducer: new FormControl(''),
      cvalue: new FormControl(''),
      description: new FormControl(''),
      sdate: new FormControl(''),
      stdt: new FormControl('')
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
      return this.cabinetService.updateCare(careId.id, 1, care).subscribe(value => console.log(value));
    });
  }
}
