import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CabinetService} from '../../../services/cabinet.service';
import {FormControl, FormGroup} from '@angular/forms';
import {UpdateUser} from '../../../models/user/User';
import {BroadcastService} from '../../../services/components-data/broadcast.service';

@Component({
  selector: 'app-single-user-edit',
  templateUrl: './single-user-edit.component.html',
  styleUrls: ['./single-user-edit.component.scss']
})
export class SingleUserEditComponent implements OnInit {
  updateForm: FormGroup;
  errorResponse = []; successResponse = false;
  constructor(private activatedRoute: ActivatedRoute,
              private cabinetService: CabinetService,
              private broadcastService: BroadcastService) {
    this.updateForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      location: new FormControl(''),
      number: new FormControl(''),
      warehouse: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl(''),
      bonusesQuantity: new FormControl(''),
      shoppingQuantity: new FormControl(''),
      deliveredShopsQuantity: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(userId => {
      this.cabinetService.getUser(userId.id).subscribe(value => {
        console.log(value);
        for (const param of Object.keys(this.updateForm.controls)) {
          for (const user in value) {
            if (param === user){
              this.updateForm.get(param).setValue(value[param]);
            }
          }
        }
      });
    });
  }

  updateUser(): void {
    const user: UpdateUser = this.updateForm.value;
    this.activatedRoute.params.subscribe(userId => {
      return this.cabinetService.updateUser(userId.id, user).toPromise()
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
