import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgetPasswordService {
  private startTimer: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {}

  getStatusTimer(): Observable<boolean> {
    return this.startTimer.asObservable();
  }
  setTimer(value: boolean) {
    this.startTimer.next(value);
  }
}
