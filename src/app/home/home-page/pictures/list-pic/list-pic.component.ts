import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { PictureService } from '../Services/picture.service';
import { IResponse } from '../../../../interfaces/iresponse';
import { IPicture } from '../../../../interfaces/ipicture';
import { IPaginationInfo } from '../../../../interfaces/ipagination-info';

@Component({
  selector: 'app-list-pic',
  templateUrl: './list-pic.component.html',
  styleUrl: './list-pic.component.scss',
})
export class ListPicComponent implements OnInit {
  picturesModel: IPicture[] = [];
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  option = {
    path: 'assets/Images/loading.json',
  };
  constructor(private pictureService: PictureService) {}
  ngOnInit(): void {
    this.trackPictures();
    this.loadPictures();
  }
  trackPictures() {
    this.pictureService.pictures.subscribe({
      next: (res: IPicture[]) => {
        this.picturesModel = [...this.picturesModel, ...res];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  loadPictures() {
    this.isLoading.set(true);
    this.pictureService.getAllPictures(1, 10).subscribe({
      next: (res: IResponse<IPaginationInfo<IPicture[]>>) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  onSelect(path: string) {
    this.pictureService.picture.emit(path);
  }
}
