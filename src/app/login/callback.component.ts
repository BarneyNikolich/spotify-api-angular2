import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';
import {tokenize} from "@angular/compiler/src/ml_parser/lexer";


@Component({
  selector: 'app-callback',
  template: `
  <h2>
    SUCCESSFUL CALL BACK
  </h2>
  `
})
export class CallbackComponent implements OnInit {

  constructor(public http: Http) { }

  ngOnInit() {
  }



}
