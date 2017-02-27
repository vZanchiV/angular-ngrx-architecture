import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { IAppState } from '../stores/IAppState';
import { ITitleService } from './ITitle.service';

@Injectable()
export class TitleService implements ITitleService {

  constructor(private store: Store<IAppState>) {}

  setTitle(title): void {
    this.store.dispatch({ type: 'NEW_TITLE', payload: title });
  }

  setTitleWithQuestionMark(title): void {
    this.store.dispatch({ type: 'NEW_TITLE', payload: `${title}?` });
  }

}
