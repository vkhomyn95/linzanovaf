import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CabinetService} from '../../../services/cabinet.service';
import {PasswordData, UpdateCurrentUser, UpdateUser} from '../../../models/user/User';
import {BroadcastService} from '../../../services/components-data/broadcast.service';

@Component({
  selector: 'app-cabinet-user-data',
  templateUrl: './cabinet-user-data.component.html',
  styleUrls: ['./cabinet-user-data.component.scss']
})
export class CabinetUserDataComponent implements OnInit {
  updateForm: FormGroup;
  isFieldHidden = true;
  loader = true;
  errorResponse = []; successResponse = false; passwordListErrors: string[] = [];
  paaswordValidator = false;

  constructor(private cabinetService: CabinetService,
              private broadcastService: BroadcastService) {
    this.updateForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      patronymic: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      location: new FormControl(''),
      number: new FormControl(''),
      postIndex: new FormControl(''),
      warehouse: new FormControl(''),
      newOneFirst: new FormControl(''),
      newOneSecond: new FormControl(''),
      oldOne: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.cabinetService.getUserByUsername().subscribe(value => {
      console.log(value);
      for (const param of Object.keys(this.updateForm.controls)) {
        for (const user in value) {
          if (param === user) {
            this.updateForm.get(param).setValue(value[param]);
          }
        }
      }
      this.loader = false;
    });
  }
  updateUser(): void {
    const user: UpdateCurrentUser = this.updateForm.value;
    this.cabinetService.updateCurrentUser(user).toPromise()
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
  }
  updatePassword(): void {
    if (this.checkPasswordValidity()){
      const passwordData: PasswordData = {
        oldPassword: this.updateForm.controls.oldOne.value,
        newPassword: this.updateForm.controls.newOneFirst.value
      };
      this.cabinetService.updateCurrentUserPassword(passwordData).toPromise()
        .then((response) => {
          if (response){
            setTimeout(() => {
              this.successResponse = true;
            }, 3000);
            this.successResponse = false;
          }else {
            this.broadcastService.http404.asObservable().subscribe(value => {
              if (value === true){
                this.errorResponse.push('Невірний старий пароль');
                this.removeError();
              }
            });
          }
        });
    }
  }
  checkPasswordValidity(): boolean {
    if (this.updateForm.controls.newOneFirst.value === this.updateForm.controls.newOneSecond.value &&
        this.updateForm.controls.newOneFirst.value.length > 6 && this.updateForm.controls.newOneSecond.value.length > 6) {
      return true;
    }else {
      this.paaswordValidator = true;
      this.passwordListErrors.push('Паролі повинен містити не менше 6 символів та співпадати');
      setTimeout(() => {
        this.paaswordValidator = false;
        this.passwordListErrors.splice(-1, 1);
      }, 5000);
      return false;
    }
  }

  removeError(): void {
    setTimeout(() => {
      this.errorResponse.splice(-1, 1);
      console.log(this.errorResponse);
    }, 5000);
  }
}
