import {Component, Input, OnInit} from '@angular/core';
import {CabinetService} from '../../../services/cabinet.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() itemCategoryId;
  searchForm: FormGroup;

  constructor(private cabinetService: CabinetService,
              private router: Router) {
    this.searchForm = new FormGroup({
      searchInput: new FormControl('')
    });
  }

  ngOnInit(): void {}

  searchResults(): void {
    if (this.itemCategoryId === 0){
      this.router.navigate(['/care/search'], {queryParams: { name: this.searchForm.controls.searchInput.value}});
    }else if (this.itemCategoryId === 1){
      this.router.navigate(['/lens/search'], {queryParams: { name: this.searchForm.controls.searchInput.value}});
    }else if (this.itemCategoryId === 2){
      this.router.navigate(['/solution/search'], {queryParams: { name: this.searchForm.controls.searchInput.value}});
    }
  }
}
