import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lenses',
  templateUrl: './lenses.component.html',
  styleUrls: ['./lenses.component.scss']
})
export class LensesComponent implements OnInit {
  category = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
