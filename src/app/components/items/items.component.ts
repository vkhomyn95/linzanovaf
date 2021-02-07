import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CabinetService} from '../../services/cabinet.service';
import {CartObjectService} from '../../services/components-data/cart-object.service';
import {CartItems} from '../../models/order/CartItems';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnChanges {
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
      this.cabinetService.getAllLenses(this.currentPage, this.allPagesSize).subscribe(value => {
        value.lenses.map(val => {
          if (val.photo.length > 0 && val.photo.map(f => f.endsWith('.webp'))){
            this.cabinetService.getLensImage(val.id, 'webp').subscribe(value1 =>  {
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
        console.log(this.values);
      });
    }else if (this.router.url.indexOf('/lens/search') > -1){
      this.activatedRoute.queryParams.subscribe(params => {
        this.cabinetService.searchLensesByName(params.name, this.currentPage, this.allPagesSize).subscribe(value => {
          value.lenses.map(val => {
            if (val.photo.length > 0 && val.photo.map(f => f.endsWith('.webp'))){
              this.cabinetService.getLensImage(val.id, 'webp').subscribe(value1 =>  {
                this.createImageFromBlob(value1, val.id);
              });
            }
          });
          this.values = value.lenses;
          this.totalElements = value.totalElements;
          this.totalPages = value.totalPages;
          this.itemCategoryName = 'Контактні лінзи';
          this.itemCategoryId = 1;
          console.log(value);
          this.loader = false;
          });
      });
    }else if (this.router.url.indexOf('/lens/filter') > -1){
      this.activatedRoute.queryParams.subscribe(params => {
        this.cabinetService.getLensesByFilter(this.currentPage, this.allPagesSize, params.colName, params.name).subscribe(value => {
          value.lenses.map(val => {
            if (val.photo.length > 0 && val.photo.map(f => f.endsWith('.webp'))){
              this.cabinetService.getLensImage(val.id, 'webp').subscribe(value1 =>  {
                this.createImageFromBlob(value1, val.id);
              });
            }
          });
          this.values = value.lenses;
          this.totalElements = value.totalElements;
          this.totalPages = value.totalPages;
          this.itemCategoryName = 'Контактні лінзи';
          this.itemCategoryId = 1;
          console.log(value);
          this.loader = false;
        });
      });
    }else if (this.router.url.indexOf('/solutions') > -1){
      this.cabinetService.getAllSolutions(this.currentPage, this.allPagesSize).subscribe(value => {
        this.values = value.solutions;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
        this.itemCategoryName = 'Розчини';
        this.itemCategoryId = 2;
        console.log(value);
        this.loader = false;
      });
    }else if (this.router.url.indexOf('/solution/search') > -1){
      this.activatedRoute.queryParams.subscribe(params => {
        this.cabinetService.searchSolutionsByName(params.name, this.currentPage, this.allPagesSize).subscribe(value => {
          this.values = value.solutions;
          this.totalElements = value.totalElements;
          this.totalPages = value.totalPages;
          this.itemCategoryName = 'Розчини';
          this.itemCategoryId = 2;
          console.log(value);
          this.loader = false;
          });
      });
    }else if (this.router.url.indexOf('/solution/filter') > -1){
      this.activatedRoute.queryParams.subscribe(params => {
        this.cabinetService.getSolutionsByFilter(this.currentPage, this.allPagesSize, params.colName, params.name).subscribe(value => {
          this.values = value.solutions;
          this.totalElements = value.totalElements;
          this.totalPages = value.totalPages;
          this.itemCategoryName = 'Розчини';
          this.itemCategoryId = 2;
          console.log(value);
          this.loader = false;
        });
      });
    }else if (this.router.url.indexOf('/cares') > -1) {
      this.cabinetService.getAllCares(this.currentPage, this.allPagesSize).subscribe(value => {
        this.values = value.drops;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
        this.itemCategoryName = 'Догляд за очима';
        this.itemCategoryId = 0;
        console.log(value);
        this.loader = false;
      });
    }else if (this.router.url.indexOf('/care/search') > -1){
      this.activatedRoute.queryParams.subscribe(params => {
        this.cabinetService.searchCaresByName(params.name, this.currentPage, this.allPagesSize).subscribe(value => {
          this.values = value.drops;
          this.totalElements = value.totalElements;
          this.totalPages = value.totalPages;
          this.itemCategoryName = 'Догляд за очима';
          this.itemCategoryId = 0;
          console.log(value);
          this.loader = false;
        });
      });
    }else if (this.router.url.indexOf('/care/filter') > -1){
      this.activatedRoute.queryParams.subscribe(params => {
        this.cabinetService.getCaresByFilter(this.currentPage, this.allPagesSize, params.colName, params.name).subscribe(value => {
          this.values = value.drops;
          this.totalElements = value.totalElements;
          this.totalPages = value.totalPages;
          this.itemCategoryName = 'Догляд за очима';
          this.itemCategoryId = 0;
          console.log(value);
          this.loader = false;
        });
      });
    }else {
      this.cabinetService.getAllLenses(this.currentPage, this.itemsSize).subscribe(value => {
        value.lenses.map(val => {
          if (val.photo.length > 0 && val.photo.map(f => f.endsWith('.webp'))){
            this.cabinetService.getLensImage(val.id, 'webp').subscribe(value1 =>  {
              this.createImageFromBlob(value1, val.id);
            });
          }
        });
        this.values = value.lenses;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
        this.itemCategoryName = 'Контактні лінзи';
        this.itemCategoryId = 1;
        console.log(value);
        this.loader = false;
      });
    }
    this.cartObjectService.getObject().subscribe(value => {
      if (value){
        this.items = value;
        console.log(this.items);
      }
    });
    // this.items = this.cartObjectService.getObject();
  }
  ngOnChanges(): void {
    console.log(this.currentPage);
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
    console.log(item);
    item.quantity = 1;
    if (item.category === 0) {
      this.items.map(value => {
        value.drops.push(item);
        console.log(this.items);
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

  nextPage(page: any): void {
    if (this.router.url.indexOf('/lenses') > -1) {
      this.cabinetService.getAllLenses(page, this.allPagesSize).subscribe(value => {
        value.lenses.map(val => {
          if (val.photo.length > 0 && val.photo.map(f => f.endsWith('.webp'))){
            console.log(val);
            this.cabinetService.getLensImage(val.id, 'webp').subscribe(imgValue =>  {
              this.createImageFromBlob(imgValue, val.id);
              debugger
            });
          }
        });
        this.values = value.lenses;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
        this.loader = false;
      });
    }else {
      this.cabinetService.getAllCares(page, this.itemsSize).subscribe(value => {
        this.values = value.drops;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
        console.log(value);
        this.loader = false;
      });
    }
  }

  prevPage(page: any): void {
    if (this.router.url.indexOf('/lenses') > -1) {
      this.cabinetService.getAllLenses(page, this.allPagesSize).subscribe(value => {
        value.lenses.map(val => {
          if (val.photo.length > 0 && val.photo.map(f => f.endsWith('.webp'))){
            this.cabinetService.getLensImage(val.id, 'webp').subscribe(value1 =>  {
              this.createImageFromBlob(value1, val.id);
            });
          }
        });
        this.values = value.lenses;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
        this.loader = false;
      });
    }else {
      this.cabinetService.getAllCares(page, this.itemsSize).subscribe(value => {
        this.values = value.drops;
        this.totalElements = value.totalElements;
        this.totalPages = value.totalPages;
        console.log(value);
        this.loader = false;
      });
    }
  }

  changeTabOption(number): void {
    if (this.isHomePage){
      this.currentStateTab = number
    }else {
      this.currentStateTab = number;
    }
    console.log(this.currentStateTab);
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
