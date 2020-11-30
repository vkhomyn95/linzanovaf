import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-session-modal',
  templateUrl: './session-modal.component.html',
  styleUrls: ['./session-modal.component.scss']
})
export class SessionModalComponent implements OnInit, OnDestroy {

  constructor(public dialogRef: MatDialogRef<SessionModalComponent>) {}
  public confirmMessage: string;

  ngOnInit(): void {
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
  }


}
