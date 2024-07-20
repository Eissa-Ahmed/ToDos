import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrl: './pictures.component.scss'
})
export class PicturesComponent implements OnInit {
  images: any;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor() { }

  ngOnInit() {

  }
}
