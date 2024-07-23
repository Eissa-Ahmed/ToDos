export interface IMedia {
  Title: string;
  Description: string;
  Medias: Media[];
}

export interface Media {
  MediaType: string;
  MediaName: string;
  Media: string;
}
