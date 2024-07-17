import { ForgetPasswordService } from '../../../../services/forget-password.service';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent implements OnInit {
  timeLeft: WritableSignal<number> = signal<number>(5);
  minutes: WritableSignal<number> = signal<number>(0);
  seconds: WritableSignal<number> = signal<number>(0);
  interval: any;

  constructor(private forgetPasswordService: ForgetPasswordService) {}

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft() > 0) {
        this.forgetPasswordService.setTimer(true);
        this.timeLeft.set(this.timeLeft() - 1);
        this.minutes.set(Math.floor(this.timeLeft() / 60));
        this.seconds.set(this.timeLeft() % 60);
      } else {
        this.forgetPasswordService.setTimer(false);
        clearInterval(this.interval);
      }
    }, 1000);
  }
  trackTimer() {
    this.forgetPasswordService.getStatusTimer().subscribe((value) => {
      if (this.timeLeft() == 0 && value) {
        this.timeLeft.set(5);
        this.minutes.set(Math.floor(this.timeLeft() / 60));
        this.seconds.set(this.timeLeft() % 60);
        this.startTimer();
      }
    });
  }
  ngOnInit(): void {
    this.startTimer();
    this.trackTimer();
  }
}
