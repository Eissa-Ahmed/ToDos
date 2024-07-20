import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { Loader2Component } from './loader2/loader2.component';
import { LoaderBtnComponent } from './loader-btn/loader-btn.component';
import { CustomErrorComponent } from './custom-error/custom-error.component';



@NgModule({
  declarations: [
    LoaderComponent,
    Loader2Component,
    LoaderBtnComponent,
    CustomErrorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    Loader2Component,
    LoaderBtnComponent,
    CustomErrorComponent
  ]
})
export class DynamicComponentModule { }
