import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CabinetService} from '../../services/cabinet.service';
import {CartObjectService} from '../../services/components-data/cart-object.service';
import {CartItems} from '../../models/order/CartItems';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  @Input() isHomePage; currentStateTab: number;
  range = 12;
  loader = true;
  totalElements = 0; totalPages = 0;
  currentPage = 0; itemsSize = 9; allPagesSize = 12;

  values = [];
  items: CartItems[]; itemCategoryName: string; itemCategoryId: number;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private cabinetService: CabinetService,
              private cartObjectService: CartObjectService) {
  }

  ngOnInit(): void {
    if (this.router.url.indexOf('/lenses') > -1) {
      this.getAllLenses(this.currentPage);
    }else if (this.router.url.indexOf('/lens/search') > -1){
      this.getLensesSearch(this.currentPage);
    }else if (this.router.url.indexOf('/lens/filter') > -1){
      this.getLensesFilter(this.currentPage);
    }else if (this.router.url.indexOf('/solutions') > -1){
     this.getAllSolutions(this.currentPage);
    }else if (this.router.url.indexOf('/solution/search') > -1){
      this.getSolutionsSearch(this.currentPage);
    }else if (this.router.url.indexOf('/solution/filter') > -1){
      this.getSolutionsFilter(this.currentPage);
    }else if (this.router.url.indexOf('/cares') > -1) {
      this.getAllCares(this.currentPage);
    }else if (this.router.url.indexOf('/care/search') > -1){
      this.getCaresSearch(this.currentPage);
    }else if (this.router.url.indexOf('/care/filter') > -1){
      this.getCareFilter(this.currentPage);
    }else {
      this.getHomePageItems(this.currentPage);
    }
    this.cartObjectService.getObject().subscribe(value => {
      if (value){
        this.items = value;
      }
    });
  }

  getAllLenses(page): void {
    this.cabinetService.getAllLenses(page, this.allPagesSize).subscribe(value => {
      value.lenses.map(val => {
        if (val.photo.length > 0 && val.photo.map(f => f.endsWith('.webp'))){
          this.cabinetService.getLensImage(val.name, 'webp').subscribe(value1 =>  {
            this.createImageFromBlob(value1, val.id);
          });
        }
      });
      this.values = value.lenses;
      this.totalElements = value.totalElements;
      this.totalPages = value.totalPages;
      this.itemCategoryName = 'Контактні лінзи';
      this.itemCategoryId = 1;
      this.loader = false;
    });
  }

  getLensesSearch(page): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.cabinetService.searchLensesByName(params.name, page, this.allPagesSize).subscribe(value => {
        value.lenses.map(val => {
          if (val.photo.length > 0 && val.photo.map(f => f.endsWith('.webp'))){
            this.cabinetService.getLensImage(val.name, 'webp').subscribe(value1 =>  {
              this.createImageFromBlob(value1, val.id);
            });
          }
        });
        this.values = value.lenses;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
        this.itemCategoryName = 'Контактні лінзи';
        this.itemCategoryId = 1;
        this.loader = false;
      });
    });
  }

  getLensesFilter(page): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.cabinetService.getLensesByFilter(page, this.allPagesSize, params.colName, params.name).subscribe(value => {
        value.lenses.map(val => {
          if (val.photo.length > 0 && val.photo.map(f => f.endsWith('.webp'))){
            this.cabinetService.getLensImage(val.name, 'webp').subscribe(value1 =>  {
              this.createImageFromBlob(value1, val.id);
            });
          }
        });
        this.values = value.lenses;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
        this.itemCategoryName = 'Контактні лінзи';
        this.itemCategoryId = 1;
        this.loader = false;
      });
    });
  }

  getAllSolutions(page): void {
    this.cabinetService.getAllSolutions(page, this.allPagesSize).subscribe(value => {
      value.solutions.map(val => {
        if (val.photo.length > 0 && val.photo.map(f => f.endsWith('.webp'))){
          this.cabinetService.getSolutionImage(val.name, 'webp').subscribe(value1 =>  {
            this.createImageFromBlob(value1, val.id);
          });
        }
      });
      this.values = value.solutions;
      this.totalElements = value.totalElements;
      this.totalPages = value.totalPages;
      this.itemCategoryName = 'Розчини';
      this.itemCategoryId = 2;
      this.loader = false;
    });
  }

  getSolutionsSearch(page): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.cabinetService.searchSolutionsByName(params.name, page, this.allPagesSize).subscribe(value => {
        value.solutions.map(val => {
          if (val.photo.length > 0 && val.photo.map(f => f.endsWith('.webp'))){
            this.cabinetService.getSolutionImage(val.name, 'webp').subscribe(value1 =>  {
              this.createImageFromBlob(value1, val.id);
            });
          }
        });
        this.values = value.solutions;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
        this.itemCategoryName = 'Розчини';
        this.itemCategoryId = 2;
        this.loader = false;
      });
    });
  }

  getSolutionsFilter(page): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.cabinetService.getSolutionsByFilter(page, this.allPagesSize, params.colName, params.name).subscribe(value => {
        value.solutions.map(val => {
          if (val.photo.length > 0 && val.photo.map(f => f.endsWith('.webp'))){
            this.cabinetService.getSolutionImage(val.name, 'webp').subscribe(value1 =>  {
              this.createImageFromBlob(value1, val.id);
            });
          }
        });
        this.values = value.solutions;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
        this.itemCategoryName = 'Розчини';
        this.itemCategoryId = 2;
        this.loader = false;
      });
    });
  }

  getAllCares(page): void {
    this.cabinetService.getAllCares(page, this.allPagesSize).subscribe(value => {
      value.drops.map(val => {
        if (val.photo.length > 0 && val.photo.map(f => f.endsWith('.webp'))){
          this.cabinetService.getCareImage(val.name, 'webp').subscribe(value1 =>  {
            this.createImageFromBlob(value1, val.id);
          });
        }
      });
      this.values = value.drops;
      this.totalElements = value.totalElements;
      this.totalPages = value.totalPages;
      this.itemCategoryName = 'Догляд за очима';
      this.itemCategoryId = 0;
      this.loader = false;
    });
  }

  getCaresSearch(page): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.cabinetService.searchCaresByName(params.name, page, this.allPagesSize).subscribe(value => {
        value.drops.map(val => {
          if (val.photo.length > 0 && val.photo.map(f => f.endsWith('.webp'))){
            this.cabinetService.getCareImage(val.name, 'webp').subscribe(value1 =>  {
              this.createImageFromBlob(value1, val.id);
            });
          }
        });
        this.values = value.drops;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
        this.itemCategoryName = 'Догляд за очима';
        this.itemCategoryId = 0;
        this.loader = false;
      });
    });
  }

  getCareFilter(page): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.cabinetService.getCaresByFilter(page, this.allPagesSize, params.colName, params.name).subscribe(value => {
        value.drops.map(val => {
          if (val.photo.length > 0 && val.photo.map(f => f.endsWith('.webp'))){
            this.cabinetService.getCareImage(val.name, 'webp').subscribe(value1 =>  {
              this.createImageFromBlob(value1, val.id);
            });
          }
        });
        this.values = value.drops;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
        this.itemCategoryName = 'Догляд за очима';
        this.itemCategoryId = 0;
        this.loader = false;
      });
    });
  }

  getHomePageItems(page): void {
    this.cabinetService.getAllLenses(page, this.itemsSize).subscribe(value => {
      value.lenses.map(val => {
        if (val.photo.length > 0 && val.photo.map(f => f.endsWith('.webp'))){
          this.cabinetService.getLensImage(val.name, 'webp').subscribe(value1 =>  {
            this.createImageFromBlob(value1, val.id);
          });
        }
      });
      this.values = value.lenses;
      this.totalElements = value.totalElements;
      this.totalPages = value.totalPages;
      this.itemCategoryName = 'Контактні лінзи';
      this.itemCategoryId = 1;
      this.loader = false;
    });
  }

  paginationNavigation(page): void {
    if (this.router.url.indexOf('/lenses') > -1) {
      this.getAllLenses(page);
    }else if (this.router.url.indexOf('/lens/search') > -1){
      this.getLensesSearch(page);
    }else if (this.router.url.indexOf('/lens/filter') > -1){
      this.getLensesFilter(page);
    }else if (this.router.url.indexOf('/solutions') > -1){
      this.getAllSolutions(page);
    }else if (this.router.url.indexOf('/solution/search') > -1){
      this.getSolutionsSearch(page);
    }else if (this.router.url.indexOf('/solution/filter') > -1){
      this.getSolutionsFilter(page);
    }else if (this.router.url.indexOf('/cares') > -1) {
      this.getAllCares(page);
    }else if (this.router.url.indexOf('/care/search') > -1){
      this.getCaresSearch(page);
    }else if (this.router.url.indexOf('/care/filter') > -1){
      this.getCareFilter(page);
    }else {
      this.getHomePageItems(page);
    }
  }


  nextPage(page: any): void {
    this.paginationNavigation(page);
  }

  prevPage(page: any): void {
    this.paginationNavigation(page);
  }

  viewDetails(category, id): void {
    if (category === 0){
      this.router.navigate(['cares', id], {state: { stateId: id }});
    }else if (category === 1) {
      this.router.navigate(['lenses', id], {state: { stateId: id }});
    }else if (category === 2) {
      this.router.navigate(['solutions', id], {state: { stateId: id }});
    }
  }

  addToCartItem(item): void {
    item.quantity = 1;
    if (item.category === 0) {
      this.items.map(value => {
        value.drops.push(item);
      });
      this.cartObjectService.sendObject(this.items);
    } else if (item.category === 1) {
      this.items.map(value => {
        value.lenses.push(item);
      });
      this.cartObjectService.sendObject(this.items);
    } else if (item.category === 2) {
      this.items.map(value => {
        value.solutions.push(item);
      });
      this.cartObjectService.sendObject(this.items);
    }
  }

  changeTabOption(number): void {
    if (this.isHomePage){
      this.currentStateTab = number
    }else {
      this.currentStateTab = number;
    }
  }

  deleteCheckpoints(): void {
    if (this.isHomePage){
      this.currentStateTab = undefined;
    }else {
      this.currentStateTab = 0;
    }
  }


  createImageFromBlob(photo: Blob, imageId): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.values.map((value) => {
        if (imageId === value.id){
          value.img = reader.result;
        }
      });
    }, false);

    if (photo) {
      reader.readAsDataURL(photo);
    }
  }
}
