import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning-banner',
  templateUrl: './warning-banner.component.html',
  styleUrls: ['./warning-banner.component.scss']
})
export class WarningBannerComponent implements OnInit {
  isBannerVisible = true;

  constructor() { }

  ngOnInit(): void {
  }

  hideBanner(): void {
    this.isBannerVisible = false;
  }
}
