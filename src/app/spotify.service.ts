import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class SpotifyService {

  static BASE_URL = 'https://api.spotify.com/v1';

  constructor(public http: Http) {}

  query(URL: string, params?: Array<string>): Observable<any[]> {
    let queryUrl = `${SpotifyService.BASE_URL}${URL}`;
    if (params) {
      queryUrl = `${queryUrl}?${params.join('&')}`;
    }

    const apiKey = environment.spotifyApiKey;
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

  register(): Observable<any[]> {
    const clientId = '629b4075479c4a5081ef4e30c991e921';
    const url = 'https://accounts.spotify.com/authorize';
    const params = [
      `client_id=${clientId}`,
      `response_type=code`,
      `redirect_uri=http://localhost:4200/`
      // `scope=user-read-private%20user-read-email`,
      // `state=34fFs29kd09`
    ];

    const queryUrl = `${url}?${params.join('&')}`;
    return this.http.request(queryUrl).map((res: any) => res.json());
  }



}
