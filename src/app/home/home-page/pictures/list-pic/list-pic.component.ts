import { Component } from '@angular/core';
import { PictureService } from '../Services/picture.service';

@Component({
  selector: 'app-list-pic',
  templateUrl: './list-pic.component.html',
  styleUrl: './list-pic.component.scss'
})
export class ListPicComponent {

  listOfImages: string[] = [
    'assets/Images/photo_2024-05-20_11-42-54.jpg',
    'assets/Images/photo_2024-05-20_11-42-54.jpg',
    'assets/Images/photo_2024-05-20_11-42-54.jpg',
    'assets/Images/photo_2024-05-20_11-42-54.jpg',
    'assets/Images/register.png',
    'assets/Images/photo_2024-05-20_11-42-54.jpg',
    'assets/Images/photo_2024-05-20_11-42-54.jpg',
    'assets/Images/photo_2024-05-20_11-42-54.jpg',
    'assets/Images/photo_2024-05-20_11-42-54.jpg',
    'assets/Images/photo_2024-05-20_11-42-54.jpg',
    'assets/Images/photo_2024-05-20_11-42-54.jpg',
    'assets/Images/photo_2024-05-20_11-42-54.jpg'
  ]

  constructor(private pictureService: PictureService) {

  }
  onSelect(path: string) {
    this.pictureService.picture.emit(path);
  }
}
