import { Component, OnInit } from '@angular/core';
import {CabinetService} from '../../../services/cabinet.service';
import {CabinetStats} from '../../../models/user/CabinetStats';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {
  stats: CabinetStats;
  loader = true;

  constructor(private cabinetService: CabinetService) {}

  ngOnInit(): void {
    this.cabinetService.getUserStatsByUsername().subscribe(value => {
      this.stats = value;
      this.loader = false;
    });
  }

}
