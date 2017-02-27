import { Component, Input} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IAppState } from './stores/IAppState';

import { InterfaceTitleService } from './services/interfacetitle.service';
import { TitleAuChocolatService } from "./services/titleauchocolat.service";
import { TitleAuCaramelService } from "./services/titleaucaramel.service";
import { TitleService } from "./services/title.service";

@Component({
  selector: 'app-root',
  providers: [
    { provide: InterfaceTitleService, useClass: TitleAuCaramelService },
    { provide: TitleAuChocolatService, useClass: TitleAuChocolatService }
  ],
  template: `
    <h1>
      {{title | async}}
    </h1>
    <input type="text" [(ngModel)]="nextTitle">
    <button (click)="changeTitle()">Change Title</button>
    <app-child [myService]="childService"></app-child>`,
  styles:  []
})
export class AppComponent {
  title: Observable<string>;
  nextTitle: string;

  constructor (
    private store: Store<IAppState>
    , private titleService: InterfaceTitleService
    , private childService: TitleAuChocolatService
  ) {

    this.title = store.select('title');

  }

  changeTitle() {

    this.titleService.setTitle(this.nextTitle);
    // this.store.dispatch({ type: 'NEW_TITLE', payload: this.nextTitle });
    // this.store.dispatch({ type: 'NEW_TITLE_WITH_QUESTION_MARK', payload: this.nextTitle });

  }

}
