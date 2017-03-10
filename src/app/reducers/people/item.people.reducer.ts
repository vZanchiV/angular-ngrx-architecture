import { Action } from '@ngrx/store';
import {ItemPeopleClass} from "../../models/people/item.people.class";

export const PEOPLE_ITEM_SET_ITEM = 'PEOPLE_ITEM_SET_ITEM';

export function peopleItemSetItem(newPeopleItem) {
  return {type: PEOPLE_ITEM_SET_ITEM, payload: newPeopleItem};
}

export function peopleItemReducer(state: ItemPeopleClass = new ItemPeopleClass({}), action: Action) {
  switch (action.type) {
    case 'PEOPLE_ITEM_SET_ITEM':
      return action.payload;
    default:
      return state;
  }
}
