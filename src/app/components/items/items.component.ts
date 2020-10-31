import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {CabinetService} from '../../services/cabinet.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  drops = [];
  items = [{
    drops: []
  }];
  @Output() sendObject: EventEmitter <any> = new EventEmitter<any>();

  constructor(private router: Router,
              private cabinetService: CabinetService) { }

  ngOnInit(): void {
    this.cabinetService.getAllCares(0, 10).subscribe(value => this.drops = value.drops);
    // console.log(this.drops);
  }

  viewDetails(): void {
    this.router.navigate(['single']);
  }

  addToCartItem(drop): void {
    this.items.map(value => {
      value.drops.push(drop);
    });
    this.sendObject.emit(drop);
    console.log(this.items);
  }
}
