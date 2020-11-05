import {Component, Input, OnInit} from '@angular/core';
import {HomeComponent} from '../home/home.component';
import {TokenStorageService} from '../../services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'linzanova';
  private roles: string[];
  isLoggedIn = false;


  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user;
    }
  }
}
