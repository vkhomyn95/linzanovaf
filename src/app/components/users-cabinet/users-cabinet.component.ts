import { Component, OnInit } from '@angular/core';
import {CabinetService} from '../../services/cabinet.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users-cabinet',
  templateUrl: './users-cabinet.component.html',
  styleUrls: ['./users-cabinet.component.scss']
})
export class UsersCabinetComponent implements OnInit {
  users = [];
  currentPage =  0;
  currentSize = 2;
  totalElements: number;
  totalPages: number;
  itemName: string;

  constructor(private cabinetService: CabinetService, private router: Router) { }

  ngOnInit(): void {
    this.cabinetService.getAllUsers(this.currentPage, this.currentSize).subscribe(value => {
      this.users = value.users;
      this.totalElements = value.totalElements;
      this.totalPages = value.totalPages;
      console.log(value);
    });
  }

  getCurrentUserEditView(userId): void {
    this.router.navigate(['admin/users', userId]);
  }

  prevPage(): void {
    if (this.getItemsByName() !== false){
      if (this.currentPage >= 1) {
        this.cabinetService.searchUserByName(this.itemName, this.currentPage -= 1, this.currentSize)
          .subscribe(value => this.users = value.users);
      }
    }else {
      if (this.currentPage >= 1){
        this.cabinetService.getAllUsers(this.currentPage -= 1, this.currentSize)
          .subscribe(value => this.users = value.users);
      }
    }
  }

  nextPage(): void {
    if (this.getItemsByName() !== false){
      if (this.currentPage < this.totalPages - 1) {
        this.cabinetService.searchUserByName(this.itemName, this.currentPage += 1, this.currentSize)
          .subscribe(value => this.users = value.users);
      }
    }else {
      if (this.currentPage < this.totalPages - 1){
        this.cabinetService.getAllUsers(this.currentPage += 1, this.currentSize)
          .subscribe(value => this.users = value.users);
      }
    }
  }

  selectedOption(value: any): void {
    this.currentSize = +value.value;
    this.cabinetService.getAllUsers(this.currentPage, this.currentSize).subscribe(values => {
      this.users = values.users;
      this.totalPages = values.totalPages;
    });
  }

  getItemsByName(): boolean {
    if (this.itemName) {
      this.cabinetService.searchUserByName(this.itemName, this.currentPage, this.currentSize).subscribe(value => {
        this.users = value.users;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
      });
    }
    return !(this.itemName === '' || this.itemName === undefined);
  }
}
