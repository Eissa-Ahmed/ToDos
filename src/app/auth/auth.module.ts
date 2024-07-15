import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicComponentModule } from '../dynamic-component/dynamic-component.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './Components/auth/auth.component';
import { SocialFacebookComponent } from './Components/auth/social-facebook/social-facebook.component';
import { LoginComponent } from './Components/auth/login/login.component';
import { RegisterComponent } from './Components/auth/register/register.component';
import { SideRightAuthComponent } from './Components/auth/side-right-auth/side-right-auth.component';
import { OrComponent } from './Components/auth/or/or.component';
import { SocialGoogleComponent } from './Components/auth/social-google/social-google.component';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    SocialGoogleComponent,
    SocialFacebookComponent,
    SideRightAuthComponent,
    OrComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DynamicComponentModule,
    SharedComponentsModule,
    HttpClientModule,

  ],
})
export class AuthModule { }
