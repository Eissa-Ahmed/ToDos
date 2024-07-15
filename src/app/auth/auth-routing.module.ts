import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/auth/login/login.component';
import { RegisterComponent } from './Components/auth/register/register.component';
import { AuthComponent } from './Components/auth/auth.component';
import { registerCanDeActivateGuard } from '../guard/register-can-de-activate.guard';

const routes: Routes = [
  {
    path: '', component: AuthComponent, title: 'Auth', children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, canDeactivate: [registerCanDeActivateGuard], title: 'Register' },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
