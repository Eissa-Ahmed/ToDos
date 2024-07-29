import { Injectable } from '@angular/core';
import { IResponse } from '../../../../interfaces/iresponse';
import { IMedia, Media, Media2 } from '../../../../interfaces/imedia';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { IPaginationInfo } from '../../../../interfaces/ipagination-info';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl: string = 'https://localhost:7281/';
  constructor(private http: HttpClient) { }

  addTodo(title: string, description: string, medias: File[]): Observable<IResponse<IMedia>> {
    const formData = new FormData();
    formData.append('Title', title);
    formData.append('Description', description);
    medias.forEach((file) => {
      formData.append('Medias', file);
    });
    return this.http.post<IResponse<IMedia>>(this.baseUrl + 'api/todos', formData).pipe(
      map(response => {
        if (response.Success) {
          response.Data!.Medias.forEach((media: Media2) => {
            media.Base64 = 'data:image/' + media.Name.slice(0)[1] + ';base64,' + media.Name
          });
        }
        return response;
      })
    )
  }

  // getAllTodos(): Observable<IResponse<IMedia[]>> {
  //   return this.http.get<IResponse<IMedia[]>>(this.baseUrl + 'api/todos?PageNumber=1&PageSize=10').pipe(
  //     map(response => {
  //       if (response.Success) {
  //         console.log("Success");
  //         response.Data!.forEach((media: IMedia) => {
  //           console.log(media.Title);
  //           media.Medias.forEach((m: Media) => {
  //             m.Media = 'data:image/' + m.MediaName.slice(0)[1] + ';base64,' + m.Media
  //           })
  //         });
  //       }
  //       return response;
  //     })
  //   )
  // }


  getAllTodos(): Observable<IResponse<IPaginationInfo<IMedia[]>>> {
    return this.http.get<IResponse<IPaginationInfo<IMedia[]>>>(`${this.baseUrl}api/todos?PageNumber=1&PageSize=10`);
  }



}
