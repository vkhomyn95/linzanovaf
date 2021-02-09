import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CabinetService} from '../../services/cabinet.service';
import {Drops} from '../../models/drops/Drops';
import {Lens} from '../../models/lense/Lens';
import {Solution} from '../../models/solution/Solution';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {
  loader = true;
  imageLoader = true;
  care: Drops;
  lens: Lens;
  solution: Solution;
  changeText: boolean;
  tab = 0;
  photo: any;

  constructor(private activatedRoute: ActivatedRoute,
              private cabinetService: CabinetService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(urlId => {
      if (this.router.url.indexOf('/lenses') > -1){
        this.cabinetService.getLens(urlId.id).subscribe(lensValue => {
          this.lens = lensValue;
          this.loader = false;
          if (lensValue.photo.length > 0){
            lensValue.photo.map(p => {
              if (p.endsWith('.jpg')){
                this.cabinetService.getLensImage(lensValue.name, 'jpeg').subscribe( photo => {
                    this.createImageFromBlob(photo);
                    this.imageLoader = false;
                  });
              }
            });
          }
          });
      }else if (this.router.url.indexOf('/care') > -1){
        this.cabinetService.getCare(urlId.id).subscribe(careValue => {
            this.care = careValue;
            this.loader = false;
            if (careValue.photo.length > 0){
              careValue.photo.map(p => {
                if (p.endsWith('.jpg')){
                  this.cabinetService.getCareImage(careValue.name, 'jpeg').subscribe( photo => {
                    this.createImageFromBlob(photo);
                    this.imageLoader = false;
                  });
                }
              });
            }
          }
        );

      }else if (this.router.url.indexOf('/solutions') > -1){
        this.cabinetService.getSolution(urlId.id).subscribe(solutionValue => {
          this.solution = solutionValue;
          this.loader = false;
          if (solutionValue.photo.length > 0){
            solutionValue.photo.map(p => {
              if (p.endsWith('.jpg')){
                this.cabinetService.getSolutionImage(solutionValue.name, 'jpeg').subscribe( photo => {
                  this.createImageFromBlob(photo);
                  this.imageLoader = false;
                });
              }
            });
          }
        });
      }
    });
  }

  createImageFromBlob(photo: Blob): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.photo = reader.result;
    }, false);

    if (photo) {
      reader.readAsDataURL(photo);
    }
  }


  changeTabView(number): void {
    this.tab = number;
  }
}
