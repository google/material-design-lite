import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';

import {Home} from './components/home/home';

@Component({
  selector: 'seed-app',
  providers: [],
  pipes: [],
  directives: [ROUTER_DIRECTIVES, Home],
  templateUrl: 'app/seed-app.html',
})
@Routes([
  { path: '/',       component: Home,       }
])
export class SeedApp {

  constructor() {}

}
