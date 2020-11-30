import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-cabinet-future',
  templateUrl: './cabinet-future.component.html',
  styleUrls: ['./cabinet-future.component.scss']
})
export class CabinetFutureComponent implements OnInit {
  trackingForm: FormGroup;

  constructor() {
    this.trackingForm = new FormGroup({
      trackingNumber: new FormControl('')
    });
  }

  ngOnInit(): void {
  }
}
