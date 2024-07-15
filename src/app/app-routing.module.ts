import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './404/error.component';
import { authenticatedGuard } from './guard/authenticated.guard';
import { loginGuard } from './guard/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [loginGuard] },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivateChild: [authenticatedGuard] },
  { path: 'error', component: ErrorComponent, title: 'Not Found' },
  { path: '**', redirectTo: '/error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
