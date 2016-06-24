//import { Routes, Router, Route, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig } from '@angular/router-deprecated';

import { Component, provide } from '@angular/core';
import { Mongo }     from 'meteor/mongo';
import { bootstrap } from 'angular2-meteor-auto-bootstrap';

import { APP_BASE_HREF } from '@angular/common';

import { Parties }   from '../collections/parties';
import { PartiesList } from './imports/parties-list/parties-list';
import { PartyDetails } from './imports/party-details/party-details.ts';

@Component({
  selector: 'app',
  templateUrl: 'client/app.html',
  directives: [ROUTER_DIRECTIVES, PartiesList],
})

//new router
// @Routes([
//    new Route({ path: '/', component: PartiesList }),
//    new Route({ path: '/party/:partyId', component: PartyDetails }),
//  ])
 @RouteConfig([
  { path: '/', as: 'PartiesList', component: PartiesList },
  { path: '/party/:partyId', as: 'PartyDetails', component: PartyDetails }
])
export class Socially {
  //constructor(
  // private router: Router) {}
}

bootstrap(Socially, [ROUTER_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);
