import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetPasswordService } from '../../../../services/forget-password.service';
import { AuthService } from '../../../../services/auth.service';
import { IResponse } from '../../../../../interfaces/iresponse';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-check-otp',
  templateUrl: './check-otp.component.html',
  styleUrl: './check-otp.component.scss'
})
export class CheckOtpComponent implements OnInit {
  beforeSend = {
    path: 'assets/Images/openEmail.json',
  }
  right = {
    path: 'assets/Images/right.json',
  }
  wrong = {
    path: 'assets/Images/wrong.json',
  }
  isLoading: WritableSignal<boolean> = signal<boolean>(false)
  isRight: WritableSignal<boolean | null> = signal<boolean | null>(null)
  value: string = '';
  statusTimer: WritableSignal<boolean | null> = signal<boolean | null>(null)
  email: WritableSignal<string | null> = signal<string | null>(null)
  msg: WritableSignal<string | null> = signal<string | null>(null)
  constructor(private router: Router,
    private forgetPasswordService: ForgetPasswordService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {

  }
  ngOnInit(): void {
    this.changeIndexDots();
    this.trackTimer()
    this.trackEmail();
  }
  changeIndexDots() {
    this.forgetPasswordService.setDotsIndex(1);
  }
  onSubmit(form: NgForm) {
    this.isLoading.set(true);
    this.authService.checkCode(this.email()!, this.value).subscribe({
      next: (res: IResponse<null>) => {
        if (res.StatusCode == 200) {
          this.isRight.set(true);
          this.isLoading.set(false);
          this.authService.setAllowResetPassword(true);
          setTimeout(() => {
            this.router.navigate(['auth/forget-password/reset-password'])
          }, 2000);
        } else {
          this.isRight.set(false);
          this.isLoading.set(false);
        }
      },
      error: (err: any) => {
        const error: IResponse<null> = err.error;
        this.isRight.set(false);
        this.isLoading.set(false);
        this.msg.set(error.Message);
      }
    })
  }
  backToLogin() {
    this.router.navigate(['../'])
  }
  resendOtp() {
    this.isLoading.set(true);
    this.forgetPasswordService.setTimer(true);
    this.authService.forgetPassword(this.email()!).subscribe({
      next: (res: IResponse<null>) => {
        this.toastr.success("Successfully sent to your email");
        this.isLoading.set(false);
      },
      error: (err: any) => {
        const error: IResponse<null> = err.error;
        this.msg.set(error.Message);
        this.isLoading.set(false);
      }
    })
  }
  trackTimer() {
    this.forgetPasswordService.getStatusTimer().subscribe((value) => {
      this.statusTimer.set(value);
    })
  }
  trackEmail() {
    this.forgetPasswordService.getEmail().subscribe((value) => {
      if (value) {
        this.email.set(value);
      } else {
        this.router.navigate(['../'])
      }
    })
  }
}
