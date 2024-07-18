import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgetPasswordService {
  private startTimer: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(
    null
  );
  private dotsIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private email: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() { }

  getEmail(): Observable<string | null> {
    const email = localStorage.getItem('email');
    if (email) this.email.next(email);
    return this.email;
  }
  setEmail(value: string) {
    localStorage.setItem('email', value);
    this.email.next(value);
  }

  getDotsIndex(): Observable<number> {
    return this.dotsIndex.asObservable();
  }
  setDotsIndex(value: number) {
    this.dotsIndex.next(value);
  }

  getStatusTimer(): Observable<boolean | null> {
    return this.startTimer.asObservable();
  }
  setTimer(value: boolean) {
    this.startTimer.next(value);
  }
}
