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
import { ForgetPasswordComponent } from './Components/auth/forget-password/forget-password.component';
import { InputOtpModule } from 'primeng/inputotp';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TimerComponent } from './Components/auth/forget-password/timer/timer.component';
import { LottieComponent } from 'ngx-lottie';
import { SendOtpComponent } from './Components/auth/forget-password/send-otp/send-otp.component';
import { CheckOtpComponent } from './Components/auth/forget-password/check-otp/check-otp.component';
import { ResetPasswordComponent } from './Components/auth/forget-password/reset-password/reset-password.component';
import { DotsComponent } from './Components/auth/forget-password/dots/dots.component';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { Environment } from '../environment';
import { CustomErrorComponent } from '../dynamic-component/custom-error/custom-error.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    SocialGoogleComponent,
    SocialFacebookComponent,
    SideRightAuthComponent,
    OrComponent,
    ForgetPasswordComponent,
    TimerComponent,
    SendOtpComponent,
    CheckOtpComponent,
    ResetPasswordComponent,
    DotsComponent,
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
    InputOtpModule,
    InputTextModule,
    FloatLabelModule,
    LottieComponent,
    ButtonModule,
    MessagesModule,
    SocialLoginModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        lang: 'en',
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              Environment.ClientId
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
})
export class AuthModule { }
