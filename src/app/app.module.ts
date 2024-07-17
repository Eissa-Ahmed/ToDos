import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './404/error.component';
import { DynamicComponentModule } from './dynamic-component/dynamic-component.module';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { bearerTokenInterceptor } from './interceptors/bearer-token.interceptor';
import { versioningInterceptor } from './interceptors/versioning.interceptor';
import { TitleStrategy } from '@angular/router';
import { CustomTitleStrategy } from './title_Strategy/customTitleStrategy';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';

@NgModule({
  declarations: [AppComponent, ErrorComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DynamicComponentModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideHttpClient(
      withInterceptors([bearerTokenInterceptor, versioningInterceptor])
    ),
    { provide: TitleStrategy, useClass: CustomTitleStrategy },
    provideLottieOptions({
      player: () => player,
    }),
  ],
})
export class AppModule {}
