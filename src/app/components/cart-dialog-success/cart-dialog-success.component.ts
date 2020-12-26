import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-cart-dialog-success',
  templateUrl: './cart-dialog-success.component.html',
  styleUrls: ['./cart-dialog-success.component.scss']
})
export class CartDialogSuccessComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<CartDialogSuccessComponent>) { }

  ngOnInit(): void {
  }

}
