import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionModalService {
  isLoading: BehaviorSubject<boolean>;

  constructor() {
    this.isLoading = new BehaviorSubject(false);
  }

  show(): void {
    this.isLoading.next(true);
  }
  hide(): void {
    this.isLoading.next(false);
  }

}
