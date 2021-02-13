import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CabinetService} from '../../services/cabinet.service';
import {Drops} from '../../models/drops/Drops';
import {Lens} from '../../models/lense/Lens';
import {Solution} from '../../models/solution/Solution';
import {TokenStorageService} from '../../services/token-storage.service';
import {LensService} from '../../services/lens.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Comment} from '../../models/comment/Comment';
import {BroadcastService} from '../../services/components-data/broadcast.service';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {
  loader = true;
  imageLoader = true; productCategory; productCategoryId;
  care: Drops; careComments = [];
  lens: Lens;
  solution: Solution;
  changeText: boolean;
  tab = 0;
  photo: any;
  productId; defaultCommentPage = 0; totalPages;
  commentForm: FormGroup; errorResponse = []; successResponse = false;

  constructor(private activatedRoute: ActivatedRoute,
              private cabinetService: CabinetService,
              private lensService: LensService,
              public token: TokenStorageService,
              private broadcastService: BroadcastService,
              private router: Router) {
    this.commentForm = new FormGroup({
      body: new FormControl(''),
      user: new FormControl(''),
      postId: new FormControl()
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(urlId => {
      if (this.router.url.indexOf('/lenses') > -1){
        this.cabinetService.getLens(urlId.id).subscribe(lensValue => {
          this.lens = lensValue;
          this.loader = false;
          this.productId = lensValue.id;
          this.productCategory = 'Контактні лінзи';
          this.productCategoryId = 1;
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
          this.cabinetService.getLensComments(urlId.id, this.defaultCommentPage).subscribe(lensesComments => {
            this.totalPages = lensesComments.totalPages;
            lensesComments.comments.map(value => {
              const items = new Date(value.createdAt).toDateString();
              const trimmed = items.substring(items.indexOf(' '), items.lastIndexOf(' '));
              value.createdAt = trimmed;
            });
            this.careComments = lensesComments.comments;
          });
        });
      }else if (this.router.url.indexOf('/care') > -1){
        this.cabinetService.getCare(urlId.id).subscribe(careValue => {
            this.care = careValue;
            this.loader = false;
            this.productId = careValue.id;
            this.productCategory = 'Догляд за очима';
            this.productCategoryId = 0;
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
            this.cabinetService.getCareComments(urlId.id, this.defaultCommentPage).subscribe(careComments => {
              this.totalPages = careComments.totalPages;
              careComments.comments.map(value => {
                const items = new Date(value.createdAt).toDateString();
                const trimmed = items.substring(items.indexOf(' '), items.lastIndexOf(' '));
                value.createdAt = trimmed;
              });
              this.careComments = careComments.comments;
            });
          }
        );

      }else if (this.router.url.indexOf('/solutions') > -1){
        this.cabinetService.getSolution(urlId.id).subscribe(solutionValue => {
          this.solution = solutionValue;
          this.loader = false;
          this.productId = solutionValue.id;
          this.productCategory = 'Розчини';
          this.productCategoryId = 2;
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
          this.cabinetService.getSolutionComments(urlId.id, this.defaultCommentPage).subscribe(solutionComments => {
            this.totalPages = solutionComments.totalPages;
            solutionComments.comments.map(value => {
              const items = new Date(value.createdAt).toDateString();
              const trimmed = items.substring(items.indexOf(' '), items.lastIndexOf(' '));
              value.createdAt = trimmed;
            });
            this.careComments = solutionComments.comments;
          });
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

  loadMoreComments(): void {
    if (this.totalPages !== this.defaultCommentPage + 1){
      this.cabinetService.getCareComments(this.productId, this.defaultCommentPage + 1).subscribe(comments => {
        comments.comments.map(value => {
          const items = new Date(value.createdAt).toDateString();
          const trimmed = items.substring(items.indexOf(' '), items.lastIndexOf(' '));
          value.createdAt = trimmed;
          this.careComments.push(value);
        });
        this.defaultCommentPage += 1;
      });
    }
  }

  addComment(): void {
    this.commentForm.get('postId').setValue(this.productId);
    const comment: Comment  = this.commentForm.value;
    if (this.productCategoryId === 0){
      this.lensService.addLensDropComment(this.productId, comment).toPromise()
        .then((response) => {
          if (response){
            setTimeout(() => {
              this.successResponse = true;
            }, 3000);
            this.successResponse = false;
          }else {
            this.broadcastService.http404.asObservable().subscribe(value => {
              if (value === true){
                this.errorResponse.push('Повторіть спробу пізніше');
                this.removeError();
              }
            });
          }
        });
    }else if (this.productCategoryId === 1){
      this.lensService.addLensComment(this.productId, comment).toPromise()
        .then((response) => {
          if (response){
            setTimeout(() => {
              this.successResponse = true;
            }, 3000);
            this.successResponse = false;
          }else {
            this.broadcastService.http404.asObservable().subscribe(value => {
              if (value === true){
                this.errorResponse.push('Повторіть спробу пізніше');
                this.removeError();
              }
            });
          }
        });
    }else if (this.productCategoryId === 2){
      this.lensService.addSolutionComment(this.productId, comment).toPromise()
        .then((response) => {
          if (response){
            setTimeout(() => {
              this.successResponse = true;
            }, 3000);
            this.successResponse = false;
          }else {
            this.broadcastService.http404.asObservable().subscribe(value => {
              if (value === true){
                this.errorResponse.push('Повторіть спробу пізніше');
                this.removeError();
              }
            });
          }
        });
    }
  }

  removeError(): void {
    setTimeout(() => {
      this.errorResponse.splice(-1, 1);
      console.log(this.errorResponse);
    }, 5000);
  }
}
