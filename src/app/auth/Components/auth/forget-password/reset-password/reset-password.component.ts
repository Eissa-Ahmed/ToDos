import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { ForgetPasswordService } from '../../../../services/forget-password.service';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { passwordValidator } from '../../../../../Validators/Register/password.validator';
import { AuthService } from '../../../../services/auth.service';
import { IResponse } from '../../../../../interfaces/iresponse';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  password = {
    path: 'assets/Images/password.json',
  }
  isLoading: WritableSignal<boolean> = signal<boolean>(false)
  email: WritableSignal<string | null> = signal<string | null>(null)
  msg: WritableSignal<string | null> = signal<string | null>(null)
  formGroup!: FormGroup;
  timeOut: any;
  subscription: Subscription[] = [];
  constructor(private router: Router,
    private forgetPasswordService: ForgetPasswordService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.changeIndexDots();
    this.initFormGroup();
    this.clearLocalStorageAfter3Min();
    this.trackEmail();
  }
  changeIndexDots() {
    this.forgetPasswordService.setDotsIndex(2);
  }
  initFormGroup() {
    this.formGroup = this.formBuilder.group({
      password: ['', { validators: [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)] }],
      confirmPassword: ['']
    }, { validators: [passwordValidator] })
  }
  getControl(controlName: string): AbstractControl {
    return this.formGroup.get(controlName)!;
  }
  onSubmit() {
    this.isLoading.set(true);
    this.subscription.push(
      this.authService.confirmPassword(this.email()!, this.formGroup.value.password).subscribe({
        next: (res: IResponse<null>) => {
          this.isLoading.set(false);
          if (res.StatusCode == 200) {
            this.toastr.success("Password changed successfully");
            this.clearLocalStorage();
            this.router.navigate(['/auth/login']);
          } else {
            this.msg.set(res.Message);
          }
        },
        error: (err: any) => {
          const error: IResponse<null> = err.error;
          this.isLoading.set(false);
          this.msg.set(error.Message);
        }
      })
    );
  }
  trackEmail() {
    this.subscription.push(
      this.forgetPasswordService.getEmail().subscribe((value) => {
        if (!value) {
          this.router.navigate(['/auth/forget-password']);
        }
        this.email.set(value);
      })
    )
  }

  clearLocalStorageAfter3Min() {
    this.timeOut = setTimeout(() => {
      this.clearLocalStorage();
    }, 180000);
  }
  clearLocalStorage() {
    localStorage.clear();
    this.router.navigate(['/auth/forget-password']);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeOut);
    this.subscription.forEach(sub => sub.unsubscribe())
  }

}

