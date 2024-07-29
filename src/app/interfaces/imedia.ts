export interface IMedia {
  Id: string;
  CreatedAt: Date;
  Title: string;
  Description: string;
  Medias: Media2[];
}

export interface Media {
  MediaType: string;
  MediaName: string;
  Media: string;
}

export interface Media2 {
  Name: string;
  Type: string;
  extension: string;
  Size: number;
  Base64: string;
}
