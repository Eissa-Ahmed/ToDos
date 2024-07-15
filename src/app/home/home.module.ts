import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './home-page/header/header.component';
import { HomeComponent } from './home-page/home/home.component';
import { PicturesComponent } from './home-page/pictures/pictures.component';
import { VideosComponent } from './home-page/videos/videos.component';
import { AudiosComponent } from './home-page/audios/audios.component';
import { FilesComponent } from './home-page/files/files.component';
import { MainPicComponent } from './home-page/pictures/main-pic/main-pic.component';
import { ListPicComponent } from './home-page/pictures/list-pic/list-pic.component';


@NgModule({
  declarations: [
    HomePageComponent,
    HeaderComponent,
    HomeComponent,
    PicturesComponent,
    VideosComponent,
    AudiosComponent,
    FilesComponent,
    MainPicComponent,
    ListPicComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
