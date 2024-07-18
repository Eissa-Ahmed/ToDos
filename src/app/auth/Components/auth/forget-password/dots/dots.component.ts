import { Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { ForgetPasswordService } from '../../../../services/forget-password.service';

@Component({
  selector: 'app-dots',
  templateUrl: './dots.component.html',
  styleUrl: './dots.component.scss'
})
export class DotsComponent implements OnInit {
  fill: WritableSignal<number> = signal<number>(0);

  constructor(private forgetPasswordService: ForgetPasswordService) {

  }
  ngOnInit(): void {
    this.trackDotsIndex();
  }
  trackDotsIndex() {
    this.forgetPasswordService.getDotsIndex().subscribe((value) => {
      this.fill.set(value);
    })
  }
}
