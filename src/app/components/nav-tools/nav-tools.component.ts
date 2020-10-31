import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-tools',
  templateUrl: './nav-tools.component.html',
  styleUrls: ['./nav-tools.component.scss']
})
export class NavToolsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toItemAddPage(): void {
    this.router.navigate(['add']);
  }
}
