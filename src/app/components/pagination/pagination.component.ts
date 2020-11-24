import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() loader;
  @Input() totalPages;
  @Input() totalElements: number;
  @Input() itemsSize: number;
  @Input() currentPage: number;
  @Output() changedCurrentPagePlus: EventEmitter<any> = new EventEmitter<any>();
  @Output() changedCurrentPageMinus: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  prevPage(): void {
    if (this.currentPage === 0) {
      return;
    }else {
      this.changedCurrentPageMinus.emit( this.currentPage -= 1);
    }
  }

  nextPage(): void {
    if (this.currentPage + 1 >= this.totalPages){
      return;
    }else {
      this.changedCurrentPagePlus.emit( this.currentPage += 1);
    }
  }
}
