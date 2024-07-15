import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent implements OnInit {
  message?: string;

  constructor(private activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.receiveDataFromRoute();
  }
  receiveDataFromRoute() {
    this.activatedRoute.data.subscribe((data) => {
      this.message = data['message'];
      if (!this.message) {
        this.message = 'Page not found';
      }
    })
  }

}
