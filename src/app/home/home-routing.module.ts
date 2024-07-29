import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeComponent } from './home-page/home/home.component';
import { PicturesComponent } from './home-page/pictures/pictures.component';
import { VideosComponent } from './home-page/videos/videos.component';
import { AudiosComponent } from './home-page/audios/audios.component';
import { FilesComponent } from './home-page/files/files.component';
import { resolveHomeResolver } from './resolver/resolve-home.resolver';

const routes: Routes = [
  {
    path: '', component: HomePageComponent, children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: HomeComponent, title: 'Home', resolve: { medias: resolveHomeResolver } },
      { path: 'pictures', component: PicturesComponent, title: 'Pictures' },
      { path: 'videos', component: VideosComponent, title: 'Videos' },
      { path: 'audios', component: AudiosComponent, title: 'Audios' },
      { path: 'files', component: FilesComponent, title: 'Files' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
