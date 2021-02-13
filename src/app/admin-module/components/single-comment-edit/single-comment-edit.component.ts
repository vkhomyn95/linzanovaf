import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CabinetService} from '../../../services/cabinet.service';
import {LensService} from '../../../services/lens.service';
import {BroadcastService} from '../../../services/components-data/broadcast.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Comment} from '../../../models/comment/Comment';

@Component({
  selector: 'app-single-comment-edit',
  templateUrl: './single-comment-edit.component.html',
  styleUrls: ['./single-comment-edit.component.scss']
})
export class SingleCommentEditComponent implements OnInit {

  updateForm: FormGroup;
  errorResponse = []; successResponse = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private cabinetService: CabinetService,
              private lensService: LensService,
              private broadcastService: BroadcastService) {
    this.updateForm = new FormGroup({
      user: new FormControl(''),
      postId: new FormControl(),
      body: new FormControl('')
    });
  }

  ngOnInit(): void {
    if (this.router.url.indexOf('/lenses') > -1){
      this.getLensComment();
    }else if (this.router.url.indexOf('/solutions') > -1){
      this.getSolutionComment();
    }else if (this.router.url.indexOf('/cares') > -1){
      this.getCareComment();
    }
  }

  getLensComment(): void {
    this.activatedRoute.params.subscribe( lensId => {
      this.cabinetService.getSingleLensComment(lensId.id).subscribe(value => {
        console.log(value);
        for (const param of Object.keys(this.updateForm.controls)){
          for (const lens in value) {
            if (param === lens){
              this.updateForm.get(param).setValue(value[param]);
            }
          }
        }
      });
    });
  }

  getSolutionComment(): void {
    this.activatedRoute.params.subscribe( solutionId => {
      this.cabinetService.getSingleSolutionComment(solutionId.id).subscribe(value => {
        for (const param of Object.keys(this.updateForm.controls)){
          for (const solution in value) {
            if (param === solution){
              this.updateForm.get(param).setValue(value[param]);
            }
          }
        }
      });
    });
  }

  getCareComment(): void {
    this.activatedRoute.params.subscribe( careId => {
      this.cabinetService.getSingleCareComment(careId.id).subscribe(value => {
        for (const param of Object.keys(this.updateForm.controls)){
          for (const care in value) {
            if (param === care){
              this.updateForm.get(param).setValue(value[param]);
            }
          }
        }
      });
    });
  }

  updateComment(): void {
    const comment: Comment = this.updateForm.value;
    this.activatedRoute.params.subscribe(commentId => {
      if (this.router.url.indexOf('/lenses') > -1){
        return this.cabinetService.updateSingleLensComment(commentId.id, comment).toPromise()
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
      }else if (this.router.url.indexOf('/solutions') > -1) {
        return this.cabinetService.updateSingleSolutionComment(commentId.id, comment).toPromise()
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
      }else if (this.router.url.indexOf('/cares') > -1){
        return this.cabinetService.updateSingleCareComment(commentId.id, comment).toPromise()
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
    });
  }

  removeError(): void {
    setTimeout(() => {
      this.errorResponse.splice(-1, 1);
    }, 5000);
    this.successResponse = false;
  }
}
