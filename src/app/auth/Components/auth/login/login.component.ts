import { Component, OnDestroy, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { IResponse } from '../../../../interfaces/iresponse';
import { IAuthenticationModel } from '../../../../interfaces/iauthentication-model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AppAction } from '../../../NgRx/auth.allAction';
import { selectAuthError } from '../../../NgRx/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  subscription: WritableSignal<Subscription | null> = signal<Subscription | null>(null);
  @ViewChild('loginForm', { static: true }) loginForm!: NgForm;
  error: Observable<string | null> = this.store.select(selectAuthError);
  option = {
    path: 'assets/Images/login.json',
  }
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService, private store: Store) { }
  ngOnInit(): void {
    document.addEventListener('loginSuccess', () => {
      this.hideLoader();
    });
    this.showError();
  }
  hideLoader() {
    this.isLoading.set(false);
  }
  onSubmit() {
    this.isLoading.set(true);
    this.login();
  }
  login() {
    this.store.dispatch(AppAction.loginAction({ email: this.loginForm.value.email, password: this.loginForm.value.password }));
    // this.subscription.set(this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
    //   next: (res: IResponse<IAuthenticationModel | null>) => {
    //     if (res.StatusCode == 200)
    //       this.toastr.success(res.Message);
    //   },
    //   error: (err) => {
    //     let error: IResponse<IAuthenticationModel | null> = err.error;
    //     this.isLoading.set(false);
    //     this.toastr.error(error.Message);
    //   },
    //   complete: () => {
    //     this.isLoading.set(false);
    //     this.router.navigate(['/home']);
    //   }

    // }))
  }
  onForgetPassword() {
    this.error.subscribe((res) => {
      if (res) {
        this.toastr.error(res);
      }
    })
  }

  showError() {

  }
  getControler(controlName: string): AbstractControl | null {
    return this.loginForm.controls[controlName];
  }
  ngOnDestroy(): void {
    document.removeEventListener('loginSuccess', () => {
      this.hideLoader();
    })
    const sub = this.subscription();
    if (sub) {
      sub.unsubscribe();
    }
  }
}
