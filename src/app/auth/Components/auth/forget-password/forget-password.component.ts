import {
  Component,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import { ForgetPasswordService } from '../../../services/forget-password.service';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent implements OnInit {
  otpSending: AnimationOptions = {
    path: 'assets/Images/otpSending.json',
  };
  otp: AnimationOptions = {
    path: 'assets/Images/otp.json',
  };
  value: string = '';
  isSending: WritableSignal<boolean> = signal<boolean>(false);
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  timerisRunning: WritableSignal<boolean> = signal<boolean>(false);

  constructor(private forgetPasswordService: ForgetPasswordService) {}
  ngOnInit(): void {
    this.trackTimer();
  }

  onSubmit(form: NgForm) {
    this.isSending.set(true);
  }
  confirmOtp() {
    this.isSending.set(false);
  }
  resendCode() {
    this.forgetPasswordService.setTimer(true);
  }
  trackTimer() {
    this.forgetPasswordService.getStatusTimer().subscribe((value) => {
      if (value) {
        this.timerisRunning.set(true);
      } else {
        this.timerisRunning.set(false);
      }
    });
  }
}
