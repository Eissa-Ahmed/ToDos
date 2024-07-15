import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-button-shared',
  templateUrl: './button-shared.component.html',
  styleUrl: './button-shared.component.scss'
})
export class ButtonSharedComponent {
  // ngOnInit(): void {
  //   this.width ?? '100%';
  //   this.color ?? 'white';
  //   this.backgroundColor ?? '#B36840';
  // }
  @Input() text!: string;
  @Input() width: string | undefined;
  @Input() backgroundColor: string | undefined;
  @Input() color: string | undefined;
  @Input() form: boolean | undefined;
}
