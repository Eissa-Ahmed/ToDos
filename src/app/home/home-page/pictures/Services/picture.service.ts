import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { IResponse } from '../../../../interfaces/iresponse';
import { IPicture } from '../../../../interfaces/ipicture';
import { IPaginationInfo } from '../../../../interfaces/ipagination-info';
import { IMedia, Media } from '../../../../interfaces/imedia';

@Injectable({
  providedIn: 'root',
})
export class PictureService {
  picture: EventEmitter<string | null> = new EventEmitter<string | null>();
  public pictures: Subject<IPicture[]> = new Subject<IPicture[]>();
  constructor(private http: HttpClient) {}

  getPictures(): IPicture[] {
    let result: IPicture[] = [];
    this.pictures.subscribe({
      next: (res: IPicture[]) => {
        result = res;
      },
    });
    return result;
  }
  getAllPictures(
    pageNumber: number,
    pageSize: number
  ): Observable<IResponse<IPaginationInfo<IPicture[]>>> {
    return this.http
      .get<IResponse<IPaginationInfo<IPicture[]>>>(
        `https://localhost:7281/api/medias?Type=Image&PageNumber=${pageNumber}&PageSize=${pageSize}`
      )
      .pipe(
        map((response) => {
          if (response.Success && response.Data) {
            response.Data.Data = response.Data.Data.map((picture) => {
              picture.Base64 =
                'data:image/' + 'jpeg' + ';base64,' + picture.Base64;
              return picture;
            });
          }
          return response;
        }),
        tap((response: IResponse<IPaginationInfo<IPicture[]>>) => {
          if (response.Success) {
            this.pictures.next(response.Data!.Data!);
          }
        })
      );
  }
  addPicture(obj: {
    Title: string;
    Description: string;
    Medias: File[];
  }): Observable<IResponse<IMedia>> {
    const formData = new FormData();
    formData.append('Title', obj.Title);
    formData.append('Description', obj.Description);
    obj.Medias.forEach((file) => {
      formData.append('Medias', file);
    });
    return this.http
      .post<IResponse<IMedia>>('https://localhost:7281/api/todos', formData)
      .pipe(
        tap((response: IResponse<IMedia>) => {
          if (response.Success) {
            response.Data!.Medias.forEach((media: Media) => {
              this.pictures.next([
                {
                  Id: '',
                  Name: media.MediaName,
                  Extension: 'jpg',
                  Type: media.MediaType,
                  Size: 0,
                  Base64: 'data:image/' + 'jpeg' + ';base64,' + media.Media,
                } as IPicture,
              ]);
            });
          }
        })
      );
  }
}
