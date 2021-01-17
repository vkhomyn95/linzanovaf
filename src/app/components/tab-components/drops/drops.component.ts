import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drops',
  templateUrl: './drops.component.html',
  styleUrls: ['./drops.component.scss']
})
export class DropsComponent implements OnInit {
  category = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
