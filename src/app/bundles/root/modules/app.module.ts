import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {StoreModule } from '@ngrx/store';
import {StoreDevtoolsModule } from '@ngrx/store-devtools';
import {combineReducers} from '@ngrx/store';
import {compose} from '@ngrx/core/compose';
import {storeFreeze} from 'ngrx-store-freeze';

import {PlaygroundModule} from '../../playground/modules/playground.module';
import {PeopleModule} from '../../people/modules/people.module';

import {AppRoutingModule} from '../routers/app.router';
import {RoutingPlaygroundModule} from '../../playground/modules/routing.playground.module';
import {RoutingPeopleModule} from '../../people/modules/routing.people.module';

import {playgroundReducer} from '../../playground/reducers/playground.reducer';
import {peopleReducer} from '../../people/reducers/people.reducer';

import {AppPageComponent} from '../views/app-page.component';
import {HomePageComponent} from '../views/home-page.component';
import {AppNavComponent} from '../views/app-nav.component';

import {ModelCommonService} from '../../common/services/model.common.service';
import {environment} from '../../../../environments/environment';


// Add deepfreeze on reducers while in development
// With deepfreeze you can't change a store state
// And that's the way it should be!
// A store must stay immutable or dangerous bug will occure
const metaReducers = environment.production
  ? [combineReducers]
  : [storeFreeze, combineReducers];

const store = compose(...metaReducers)({
  title: playgroundReducer,
  peopleList: peopleReducer,
});

@NgModule({
  declarations: [
    AppPageComponent,
    HomePageComponent,
    AppNavComponent
  ],
  imports: [
    PlaygroundModule,
    PeopleModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(store),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 10
    }),
    RoutingPeopleModule,
    RoutingPlaygroundModule,
    AppRoutingModule
  ],
  providers: [
    ModelCommonService
  ],
  bootstrap: [AppPageComponent]
})
export class AppModule { }