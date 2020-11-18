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
      warehouse: new FormControl(''),
      password: new FormControl(''),
      userRole: new FormControl('')
    });
  }

  ngOnInit(): void {
  }
  updateUser(): void {
    const user: UpdateUser = this.updateForm.value;
    // this.activatedRoute.params.subscribe(userId => {
    //   return this.cabinetService.updateUser(userId.id, user).subscribe(value => console.log(value));
    // });
  }

}
