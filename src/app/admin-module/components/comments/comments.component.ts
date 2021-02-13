import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getLensCommentsList(): void {
    this.router.navigate(['admin/comments/lenses']);
  }

  getCareCommentsList(): void {
    this.router.navigate(['admin/comments/cares']);
  }

  getSolutionCommentsList(): void {
    this.router.navigate(['admin/comments/solutions']);
  }
}
