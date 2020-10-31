import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  orderStep = 0;
  items = [{
    drops: [
      {
        dropId: 1
      }
    ]
  }];

  constructor() { }

  ngOnInit(): void {
  }

  nextStep(): void {
    this.orderStep = 1;
  }

  prevStep(): void {
    this.orderStep = 0;
  }

  order(): void {
    const order = {
      "createdAt": "2020-09-01 12:18:51",
      "summ": 3800,
      "totalSumm": 3800,
      "lastName": "Vasya",
      "firstName": "Jak",
      "patronymic": "Batcovych",
      "phone": "+380984154979",
      "customerComment": 'comment',
      "customer": {
        "fields": 'Якщо є клієнт у базі'
      },
      "delivery": {
        "street": 'street',
        "city": 'city'
      },
      "items": [
        {
          "initialPrice": 2000,
          "quantity": 1,
          "id": 100,
          "displayName": 'робот'
        },
        {
          "initialPrice": 1000,
          "quantity": 1,
          "id": 101,
          "displayName": 'пальто'
        }
      ]
    }
  }
}
