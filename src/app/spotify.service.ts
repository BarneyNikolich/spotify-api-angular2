import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class SpotifyService {

  static BASE_URL = 'https://api.spotify.com/v1';
  static token = 'BQDFdD99h2idONwJ4WFhvkiDj4-RcCa459ssGumerbPMYWMUf8g-2Zi2qAwTTp3BjKC5dDStA-PmnJR5_EswbBPj6G4IdstNLuzEd_zJ-7yQREl9P9POGiDVacgincTR2Ty4Ok5mEzdMbG01';

  constructor(public http: Http) {}

  query(URL: string, params?: Array<string>): Observable<any[]> {
    let queryUrl = `${SpotifyService.BASE_URL}${URL}`;
    if (params) {
      queryUrl = `${queryUrl}?${params.join('&')}`;
    }

    // const apiKey = environment.spotifyApiKey;
    const apiKey = SpotifyService.token;
    const headers = new Headers({
      'Authorization': `Bearer ${apiKey}`
    });
    const options = new RequestOptions({ headers: headers });

    return this.http.request(queryUrl, options).map((res: any) => res.json());
  }

  search(query: string, type: string): Observable<any[]> {
    return this.query(`/search`, [
      `q=${query}`,
      `type=${type}`
    ]);
  }

  searchTrack(query: string): Observable<any[]> {
    return this.search(query, 'track');
  }

  getTrack(id: string): Observable<any[]> {
    return this.query(`/tracks/${id}`);
  }

  getArtist(id: string): Observable<any[]> {
    return this.query(`/artists/${id}`);
  }

  getAlbum(id: string): Observable<any[]> {
    return this.query(`/albums/${id}`);
  }




}
