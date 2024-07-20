import { Component, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidator } from '../../../../Validators/Register/password.validator';
import { AuthService } from '../../../services/auth.service';
import { UserRegisterModel } from '../../../../interfaces/UserRegisterModel';
import { IAuthenticationModel } from '../../../../interfaces/iauthentication-model';
import { IResponse } from '../../../../interfaces/iresponse';
import { CanDeactivateComponent } from '../../../../guard/register-can-de-activate.guard';
import { Observable, of, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements CanDeactivateComponent, OnInit, OnDestroy {

  option = {
    path: 'assets/Images/register.json',
  }
  registerFrom!: FormGroup;
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  isSubmited: WritableSignal<boolean> = signal<boolean>(false);
  subscriptionRegister: WritableSignal<Subscription | undefined> = signal<Subscription | undefined>(undefined);
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService) {

  }

  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
    if (this.registerFrom?.dirty && !this.isSubmited()) {
      return new Promise<boolean>((resolve) => {
        swal.fire({
          title: 'Are you sure?',
          text: "You have unsaved changes. Are you sure you want to leave?",
          icon: 'warning',
          iconColor: '#ff7f3e',
          showCancelButton: true,
          confirmButtonColor: '#ff7f3e',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, leave!'
        }).then((result) => {
          resolve(result.isConfirmed);
        });
      });
    } else {
      return true
    }
  }
  ngOnInit(): void {
    this.InitRegisterForm();
  }
  onSubmit() {
    this.isLoading.set(true)
    this.register();
  }
  InitRegisterForm() {
    this.registerFrom = this.formBuilder.group({
      firstName: ['', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)] }],
      lastName: ['', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)] }],
      email: ['', { validators: [Validators.required, Validators.email] }],
      password: ['', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)] }],
      confirmPassword: ['', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)] }]
    }, { validators: [passwordValidator] })
  }
  register() {
    let model: UserRegisterModel = new UserRegisterModel(this.registerFrom.value.firstName, this.registerFrom.value.lastName, this.registerFrom.value.email, this.registerFrom.value.password)
    this.subscriptionRegister?.set(this.authService.register(model).subscribe({
      next: (res: IResponse<null>) => {
        this.isSubmited.set(true)
        if (res.StatusCode == 201) {
          this.toastr.success(res.Message);
        }
      },
      error: (err) => {
        let error: IResponse<null> = err.error;
        this.toastr.error(error.Message);
        this.isLoading.set(false)
      },
      complete: () => {
        this.isLoading.set(false);
        this.router.navigate(['/auth/login']);
      }
    }
    ))
  }

  getControler(controlName: string): AbstractControl {
    return this.registerFrom.get(controlName) as AbstractControl
  }
  ngOnDestroy(): void {
    let subscription = this.subscriptionRegister();
    if (subscription) {
      subscription.unsubscribe();
    }
  }
}


