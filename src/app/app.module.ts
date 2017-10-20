import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import {
  LocationStrategy,
  HashLocationStrategy,
  APP_BASE_HREF
} from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SpotifyService } from './spotify.service';
import { TrackComponent } from './track/track.component';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';


const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'artists/:id', component: ArtistComponent },
  { path: 'tracks/:id', component: TrackComponent },
  { path: 'albums/:id', component: AlbumComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    TrackComponent,
    AlbumComponent,
    ArtistComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes) // <-- routes

  ],
  providers: [SpotifyService,
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
