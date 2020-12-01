import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CabinetService} from '../../../services/cabinet.service';
import {UpdateUser} from '../../../models/user/User';

@Component({
  selector: 'app-cabinet-user-data',
  templateUrl: './cabinet-user-data.component.html',
  styleUrls: ['./cabinet-user-data.component.scss']
})
export class CabinetUserDataComponent implements OnInit {
  updateForm: FormGroup;

  constructor(private cabinetService: CabinetService) {
    this.updateForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      location: new FormControl(''),
      number: new FormControl(''),
      warehouse: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.cabinetService.getUserByUsername().subscribe(value => {
      console.log(value);
      for (const param of Object.keys(this.updateForm.controls)) {
        for (const user in value) {
          if (param === user){
            this.updateForm.get(param).setValue(value[param]);
          }
        }
      }
    });
  }
  updateUser(): void {
    const user: UpdateUser = this.updateForm.value;
    console.log(user);
    this.cabinetService.updateCurrentUser(user).subscribe(value => console.log(value));
    // this.activatedRoute.params.subscribe(userId => {
    //   return this.cabinetService.updateUser(userId.id, user).subscribe(value => console.log(value));
    // });
  }

}
