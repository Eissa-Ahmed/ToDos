import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonSharedComponent } from './button-shared/button-shared.component';



@NgModule({
  declarations: [
    ButtonSharedComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ButtonSharedComponent]
})
export class SharedComponentsModule { }
