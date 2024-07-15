import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { Loader2Component } from './loader2/loader2.component';
import { LoaderBtnComponent } from './loader-btn/loader-btn.component';



@NgModule({
  declarations: [
    LoaderComponent,
    Loader2Component,
    LoaderBtnComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    Loader2Component,
    LoaderBtnComponent
  ]
})
export class DynamicComponentModule { }
