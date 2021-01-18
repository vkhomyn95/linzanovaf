import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  category = 3;
  isHomePage = true;
  constructor() { }

  ngOnInit(): void {
  }

}
