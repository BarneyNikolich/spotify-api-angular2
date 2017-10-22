import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(public http: Http) { }

  ngOnInit() {
  }


  registerApi() {
    this.register().subscribe((res: any) =>
      console.log('RESULT: ->> ',  res));
  }

  register(): Observable<any[]> {
    const clientId = '629b4075479c4a5081ef4e30c991e921';
    const url = 'https://accounts.spotify.com/authorize/';
    const scopes = 'user-read-private user-read-email';
    // const redirectUrl = 'http://localhost:4200/#/callback';
    const redirectUrl = 'http://google.co.uk';
    const responseType = 'token';

    const headers = new Headers({
    });
    const options = new RequestOptions({ headers: headers });


    const params = [
      `client_id=${clientId}`,
      `response_type=${responseType}`,
      `redirect_uri=${redirectUrl}`,
      `scope=${scopes}`
    ];

    const queryUrl = `${url}?${params.join('&')}`;
    console.log('Query String -> ', queryUrl);

    return this.http.get(queryUrl).map((res: any) => res.json());
  }


  post() {
    this.postCall().subscribe((res: any) =>
      console.log('RESULT: ->> ',  res));
  }

  postCall() {
    const url = 'https://accounts.spotify.com/api/token';
    const cred = 'client_credentials';
    const client_Id = '629b4075479c4a5081ef4e30c991e921';
    const client_secret = 'b6c5a869f338412a8048d7f57d728df5'

    const a = (client_Id + ':' + client_secret).toString();
    // const toekn = new Buffer(client_Id + ':' + client_secret).toString('base64');
    // header('Access-Control-Allow-Origin: *');
    // header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    // header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    const headers = new Headers({
      'Authorization': 'Basic ' + a,
    });
    const options = new RequestOptions({ headers: headers });

    const params = [
      `grant_type=${cred}`
    ];

    const queryUrl = `${url}?${params.join('&')}`;

    console.log('Query String -> ', queryUrl);

    return this.http.post(queryUrl, options).map((res: any) => res.json());


  }

}
