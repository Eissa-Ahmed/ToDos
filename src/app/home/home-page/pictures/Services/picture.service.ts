import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  picture: EventEmitter<string | null> = new EventEmitter<string | null>();
  constructor() { }

}
