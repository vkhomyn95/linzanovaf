import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CabinetService} from '../../services/cabinet.service';
import {FormControl, FormGroup} from '@angular/forms';
import {UpdateUser} from '../../models/user/User';

@Component({
  selector: 'app-single-user-edit',
  templateUrl: './single-user-edit.component.html',
  styleUrls: ['./single-user-edit.component.scss']
})
export class SingleUserEditComponent implements OnInit {
  updateForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private cabinetService: CabinetService) {
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
    this.activatedRoute.params.subscribe(userId => {
      this.cabinetService.getUser(userId.id).subscribe(value => {
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
      return this.cabinetService.updateUser(userId.id, user).subscribe(value => console.log(value));
    });
  }
}
