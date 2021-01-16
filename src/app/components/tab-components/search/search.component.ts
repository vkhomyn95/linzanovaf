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
  searchForm: FormGroup; focusedSearch: boolean;
  targetValues = [];

  constructor(private cabinetService: CabinetService,
              private router: Router) {
    this.searchForm = new FormGroup({
      searchInput: new FormControl('')
    });
  }

  ngOnInit(): void {}

  searchResults(): void {
    if (this.targetValues.length !== 0){
      if (this.itemCategoryId === 0){
        this.router.navigate(['/care/search'], {queryParams: { name: this.searchForm.controls.searchInput.value}});
      }else if (this.itemCategoryId === 1){
        this.router.navigate(['/lens/search'], {queryParams: { name: this.searchForm.controls.searchInput.value}});
      }else if (this.itemCategoryId === 2){
        this.router.navigate(['/solution/search'], {queryParams: { name: this.searchForm.controls.searchInput.value}});
      }
    }
  }


  valueChangedSearch(target): void {
    const specialChars = /[!@#$%^&*_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!specialChars.test(target.value)){
      if (this.itemCategoryId === 0){
        this.cabinetService.searchCaresByName(target.value, 0, 10).subscribe(value => {
          this.targetValues = value.drops;
        });
      }else if (this.itemCategoryId === 1){
        this.cabinetService.searchLensesByName(target.value, 0, 10).subscribe(value => {
          this.targetValues = value.lenses;
        });
      }
      else if (this.itemCategoryId === 2){
        this.cabinetService.searchSolutionsByName(target.value, 0, 10).subscribe(value => {
          this.targetValues = value.solutions;
        });
      }
    }
  }

  setSearchValue(): void {
    setTimeout(() => {
      this.focusedSearch = false;
    }, 100);
  }

  goSearchResult(searchResult: any): void {
    if (this.itemCategoryId === 0){
      this.router.navigate(['cares', searchResult.id]);
    }else if (this.itemCategoryId === 1){
      this.router.navigate(['lenses', searchResult.id]);
    }else if (this.itemCategoryId === 2){
      this.router.navigate(['solutions', searchResult.id]);
    }
  }
}
