import { Component, OnInit } from '@angular/core';
import {CabinetService} from '../../../services/cabinet.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-solutions-comments',
  templateUrl: './solutions-comments.component.html',
  styleUrls: ['./solutions-comments.component.scss']
})
export class SolutionsCommentsComponent implements OnInit {

  comments = []; totalPages; currentPage = 0; currentSize = 10;

  constructor(private cabinetService: CabinetService,
              private router: Router) { }

  ngOnInit(): void {
    this.cabinetService.getAllSolutionComments(this.currentPage, this.currentSize).subscribe(comments => {
      this.comments = comments.comments;
      this.totalPages = comments.totalPages;
    });
  }

  prevPage(): void {
    if (this.currentPage >= 1) {
      this.cabinetService.getAllSolutionComments( this.currentPage -= 1, this.currentSize)
        .subscribe(value => this.comments = value.comments);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.cabinetService.getAllSolutionComments(this.currentPage += 1, this.currentSize)
        .subscribe(value => this.comments = value.comments);
    }
  }

  getSingleComment(id): void {
    this.router.navigate(['/admin/comments/solutions', id]);
  }
}
