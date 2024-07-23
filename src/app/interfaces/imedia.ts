export interface IMedia {
  Title: string;
  Description: string;
  Medias: Media[];
}

interface Media {
  MediaType: string;
  MediaName: string;
  Media: string;
}
