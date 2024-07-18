import { Component, OnDestroy, signal, ViewChild, WritableSignal } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { IResponse } from '../../../../interfaces/iresponse';
import { IAuthenticationModel } from '../../../../interfaces/iauthentication-model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {

  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  subscription: WritableSignal<Subscription | null> = signal<Subscription | null>(null);
  @ViewChild('loginForm', { static: true }) loginForm!: NgForm;
  option = {
    path: 'assets/Images/login.json',
  }
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }
  onSubmit() {
    this.isLoading.set(true);
    this.login();
  }
  login() {
    this.subscription.set(this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (res: IResponse<IAuthenticationModel | null>) => {
        if (res.StatusCode == 200)
          this.toastr.success(res.Message);
      },
      error: (err) => {
        let error: IResponse<IAuthenticationModel | null> = err.error;
        this.isLoading.set(false);
        this.toastr.error(error.Message);
      },
      complete: () => {
        this.isLoading.set(false);
        this.router.navigate(['/home']);
      }

    }))
  }
  onForgetPassword() {

  }

  getControler(controlName: string): AbstractControl | null {
    return this.loginForm.controls[controlName];
  }
  ngOnDestroy(): void {
    const sub = this.subscription();
    if (sub) {
      sub.unsubscribe();
    }
  }
}
