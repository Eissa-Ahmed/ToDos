import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/auth/login/login.component';
import { RegisterComponent } from './Components/auth/register/register.component';
import { AuthComponent } from './Components/auth/auth.component';
import { registerCanDeActivateGuard } from '../guard/register-can-de-activate.guard';
import { ForgetPasswordComponent } from './Components/auth/forget-password/forget-password.component';
import { SendOtpComponent } from './Components/auth/forget-password/send-otp/send-otp.component';
import { CheckOtpComponent } from './Components/auth/forget-password/check-otp/check-otp.component';
import { ResetPasswordComponent } from './Components/auth/forget-password/reset-password/reset-password.component';
import { allowForgetPasswordGuard } from '../guard/allow-forget-password.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    title: 'Auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'Login' },
      {
        path: 'register',
        component: RegisterComponent,
        canDeactivate: [registerCanDeActivateGuard],
        title: 'Register',
      },
      {
        path: 'forget-password',
        component: ForgetPasswordComponent,
        title: 'Forget',
        children: [
          { path: '', component: SendOtpComponent, title: 'OTP' },
          { path: 'check-otp', component: CheckOtpComponent, title: 'OTP' },
          { path: 'reset-password', component: ResetPasswordComponent, title: 'Reset', canActivate: [allowForgetPasswordGuard] }
        ]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
