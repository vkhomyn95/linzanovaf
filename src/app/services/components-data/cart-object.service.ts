import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartObjectService {
  private subject = new Subject();

  sendObject(message: object): void {
    this.subject.next(message);
  }

  clearObjects(): void {
    this.subject.next();
  }

  getObject(): Observable<any> {
    return this.subject.asObservable();
  }
}
