import { Component, signal, WritableSignal } from '@angular/core';
import { PictureService } from '../Services/picture.service';

@Component({
  selector: 'app-main-pic',
  templateUrl: './main-pic.component.html',
  styleUrl: './main-pic.component.scss'
})
export class MainPicComponent {
  path: WritableSignal<string | null> = signal<string | null>(null);
  constructor(private pictureService: PictureService) {
    this.pictureService.picture.subscribe((path) => {
      this.path.set(path);
    });

  }
}
