import { Action } from '@ngrx/store';

export function titleTestReducer(state: string = 'Default title', action: Action) {
  switch (action.type) {
    case 'TEST_TITLE_NEW_TITLE':
      return action.payload;
    default:
      return state;
  }
}
