import { NgFor } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetPasswordService } from '../../../../services/forget-password.service';
import { AuthService } from '../../../../services/auth.service';
import { IResponse } from '../../../../../interfaces/iresponse';

@Component({
  selector: 'app-send-otp',
  templateUrl: './send-otp.component.html',
  styleUrl: './send-otp.component.scss'
})
export class SendOtpComponent implements OnInit {
  beforeSend = {
    path: 'assets/Images/otp.json',
  }
  afterSend = {
    path: 'assets/Images/otpSending.json',
  }
  isLoading: WritableSignal<boolean> = signal<boolean>(false)
  msg: WritableSignal<string | null> = signal<string | null>(null)
  constructor(private router: Router,
    private forgetPasswordService: ForgetPasswordService,
    private authService: AuthService) {

  }
  ngOnInit(): void {
    this.changeIndexDots();
  }
  changeIndexDots() {
    this.forgetPasswordService.setDotsIndex(0);
  }
  onSubmit(form: NgForm) {
    this.isLoading.set(true);
    this.authService.forgetPassword(form.value.email).subscribe({
      next: (res: IResponse<null>) => {
        this.isLoading.set(false);
        if (res.StatusCode == 200) {
          this.forgetPasswordService.setEmail(form.value.email);
          this.router.navigate(['auth/forget-password/check-otp'])
        } else {
          this.msg.set(res.Message);
        }
      },
      error: (err: any) => {
        const error: IResponse<null> = err.error;
        this.msg.set(error.Message);
        this.isLoading.set(false);
      }
    })

  }
  backToLogin() {
    this.router.navigate(['../'])
  }
}
