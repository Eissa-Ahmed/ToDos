import { Component, Input, input, InputSignal, OnInit, signal, Signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-custom-error',
  templateUrl: './custom-error.component.html',
  styleUrl: './custom-error.component.scss'
})
export class CustomErrorComponent implements OnInit {
  ngOnInit(): void {
    this.clearAfter5second();
  }
  //msg: InputSignal<string | null> = input<string | null>(null);
  @Input() msg: string | null = null

  clearAfter5second() {
    setTimeout(() => {
      this.msg = null
    }, 2000);
  }
}
