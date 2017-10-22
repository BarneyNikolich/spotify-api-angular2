import {Component, ElementRef, EventEmitter, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../spotify.service';
import {Observable} from 'rxjs/Observable';


// By importing just the rxjs operators we need, We're theoretically able
// to reduce our build size vs. importing all of them.
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switch';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  loading: EventEmitter<boolean> = new EventEmitter<boolean>();

  query: string;
  results: Object;

  constructor(private spotify: SpotifyService,
              private router: Router,
              private route: ActivatedRoute,
              public el: ElementRef) {
    this.route.queryParams.subscribe(params => { this.query = params['query'] || ''; });
  }

  ngOnInit(): void {


    this.watchKeyUp();
    console.log('initialised search bar!');

    // this.search();
  }

  watchKeyUp() {
    Observable.fromEvent(this.el.nativeElement, 'keyup')
      .map((e: any) => e.target.value)
      .filter((text: string) => text.length > 3) // filter out if empty
      .debounceTime(1000)                         // only once every 250ms
      .do(() => {
        console.log(this.query);
        this.loading.emit(true);
      })         // enable loading
      // search, discarding old events if new input comes in
      .map((query: string) => this.spotify.searchTrack(query))
      .switch()
      // act on the return of the search
      .subscribe(
        (results: Object) => { // on sucesss

          this.loading.emit(false);
          this.renderResults(results);
        },
        (err: any) => { // on error
          console.log(err);
          this.loading.emit(false);
        },
        () => { // on completion
          this.loading.emit(false);
        }
      );
  }

  search(): void {
    console.log('this.query', this.query);
    if (!this.query) {
      return;
    }

    this.spotify
      // .getArtist(this.query)
      .searchTrack(this.query)
      .subscribe((res: any) => this.renderResults(res));
  }

  renderResults(res: any): void {
    this.results = null;
    if (res && res.tracks && res.tracks.items) {
      this.results = res.tracks.items;
    }
  }

  submit(query: string): void {
    this.router.navigate(['search'], { queryParams: { query: query } }).then(_ => this.search() );
  }
}
