import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SettlementsService} from '../../services/settlements.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  authFormReg: FormGroup;
  focusedLocation: boolean; focusedNumber: boolean;
  locationNPList: any[]; numberNPList: any[];
  paaswordValidator = false; passwordValidatorLength = false; formFieldValidator = true; phoneValidator = false;
  passwordListErrors: string[] = [];

  constructor(private settlementsService: SettlementsService, private userService: UserService) {
    this.authFormReg = new FormGroup({
      rEmail: new FormControl('', [Validators.required]),
      rPhone: new FormControl('', [Validators.required]),
      rFirstName: new FormControl('', [Validators.required]),
      rLastName: new FormControl('', [Validators.required]),
      rPassword: new FormControl('', [Validators.required]),
      rPasswordRepeat: new FormControl('', [Validators.required]),
      locationNp: new FormControl(''),
      numberNp: new FormControl(''),
      aboutWarehouse: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  valueChangedLocation(target): void {
    this.settlementsService.getSettlements(target.value).subscribe(value => {
      if (value.data[0]){
        this.locationNPList = value.data[0].Addresses;
      }
    });
  }

  addLocationToForm(location: any): void {
    this.authFormReg.get('locationNp').setValue(location.Present);
    this.settlementsService.getWarehouses(location.DeliveryCity).subscribe(value => {
      this.numberNPList = value.data;
    });

  }

  setSettlements(): void {
    setTimeout(() => {
      this.focusedLocation = false;
      this.focusedNumber = false;
    }, 100);
  }

  addNumberToForm(location: any): void {
    this.authFormReg.get('numberNp').setValue(location.Number);
    this.authFormReg.get('aboutWarehouse').setValue(location.ShortAddress + ' ' + location.Description);
  }

  setWarehouse(): void {
    setTimeout(() => {
      this.focusedNumber = false;
    }, 100);
  }

  register(): object {
    console.log(this.authFormReg);
    if (this.authFormReg.valid) {
      const user: User = {
        email: this.authFormReg.value.rEmail,
        phone: this.authFormReg.value.rPhone,
        firstName: this.authFormReg.value.rFirstName,
        lastName: this.authFormReg.value.rLastName,
        password: this.authFormReg.value.rPassword,
        location: this.authFormReg.value.locationNp,
        number: this.authFormReg.value.numberNp,
        userRole: 'admin',
        warehouse: this.authFormReg.value.aboutWarehouse
      };

      console.log(user);
      if (this.checkPassword() && this.checkPasswordLength() && this.checkPhoneNumber()) {
        return this.userService.registerUser(user).subscribe(value => console.log(value));
      } else if (!this.checkPassword()) {
        this.passwordListErrors.push('Паролі не співпадають');
        setTimeout(() => {
          this.paaswordValidator = false;
          this.passwordListErrors.splice(-1, 1);
        }, 5000);
      } else if (!this.checkPasswordLength()) {
        this.passwordListErrors.push('Паролі повинен містити не менше 6 символів');
        setTimeout(() => {
          this.passwordValidatorLength = false;
          this.passwordListErrors.splice(-1, 1);
        }, 5000);
      } else if (!this.checkPhoneNumber()){
        this.passwordListErrors.push('Перевірте правельність телефону');
        setTimeout(() => {
          this.phoneValidator = true;
          this.passwordListErrors.splice(-1, 1);
        }, 5000);
      }
    }else {
      this.passwordListErrors.push('Перевірте чи всі поля заповнено коректно');
      setTimeout(() => {
        this.formFieldValidator = true;
        this.passwordListErrors.splice(-1, 1);
      }, 5000);
    }
  }

  checkPassword(): boolean {
    if (this.authFormReg.controls.rPassword.value === this.authFormReg.controls.rPasswordRepeat.value){
      this.paaswordValidator = false;
      return true;
    }
    if (this.authFormReg.controls.rPassword.value !== this.authFormReg.controls.rPasswordRepeat.value){
      this.paaswordValidator = true;
      return false;
    }
  }
  checkPasswordLength(): boolean {
    if (this.authFormReg.controls.rPassword.value.length < 6 || this.authFormReg.controls.rPasswordRepeat.value < 6){
      this.passwordValidatorLength = true;
      return false;
    }else {
      this.passwordValidatorLength = false;
      return true;
    }
  }
  checkPhoneNumber(): boolean {
    if (this.authFormReg.controls.rPhone.value.toString().startsWith('380')
      && this.authFormReg.controls.rPhone.value.toString().length === 12) {
      return true;
    }else {
      return false;
    }
  }
}
