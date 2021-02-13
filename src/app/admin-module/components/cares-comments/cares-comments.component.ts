import { Component, OnInit } from '@angular/core';
import {CabinetService} from '../../../services/cabinet.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cares-comments',
  templateUrl: './cares-comments.component.html',
  styleUrls: ['./cares-comments.component.scss']
})
export class CaresCommentsComponent implements OnInit {

  comments = []; totalPages; currentPage = 0; currentSize = 10;

  constructor(private cabinetService: CabinetService,
              private router: Router) { }

  ngOnInit(): void {
    this.cabinetService.getAllCaresComments(this.currentPage, this.currentSize).subscribe(comments => {
      this.comments = comments.comments;
      this.totalPages = comments.totalPages;
      console.log(this.comments);
    });
  }

  prevPage(): void {
    if (this.currentPage >= 1) {
      this.cabinetService.getAllCaresComments( this.currentPage -= 1, this.currentSize)
        .subscribe(value => this.comments = value.comments);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.cabinetService.getAllCaresComments(this.currentPage += 1, this.currentSize)
        .subscribe(value => this.comments = value.comments);
    }
  }

  getSingleComment(id): void {
    this.router.navigate(['/admin/comments/cares', id]);
  }

}
