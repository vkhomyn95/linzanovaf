import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  public http404: BehaviorSubject<boolean>;

  constructor() {
    this.http404 = new BehaviorSubject<boolean>(false);
  }
}
