import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';

import {Store} from '@ngrx/store';

import {IAppStore} from '../../reducers/app-store.interface';
import {peopleSetList, peopleAddItem} from '../../reducers/people/list.people.reducer';
import {TransformerPeopleService} from './transformer.people.service';
import {FactoryPeopleService} from './factory.people.service';
import {EffectPeopleService} from './effect.people.service';
import {ApiPeopleService} from './api.people.service';


@Injectable()
export class ManagerPeopleService {

  constructor(private store: Store<IAppStore>,
              private apiService: ApiPeopleService,
              private transformerService: TransformerPeopleService,
              private factoryService: FactoryPeopleService,
              private effectService: EffectPeopleService) {}

  getList(): void {
    const apiResponse$ = this.apiService.getList();
    const apiSubscription = apiResponse$.subscribe(response => {
      const resList = this.factoryService.createPeopleList({ list: response, type: 'get' });
      this.store.dispatch(peopleSetList(resList));
      apiSubscription.unsubscribe();
    });
  }

  getItem(id): void {
    const apiResponse$ = this.apiService.getItem(id);
    const apiSubscription = apiResponse$.subscribe(response => {
      const resItem = this.factoryService.createPeople({ data: response, type: 'get' });
      this.store.dispatch(peopleAddItem(resItem));
      apiSubscription.unsubscribe();
    });
  }

  postItem(item): void {
    const apiResponse$ = this.apiService.postItem(item);
    const apiSubscription = apiResponse$.subscribe(response => {
      const resItem = this.factoryService.createPeople({ data: response, type: 'get' });
      this.store.dispatch(peopleAddItem(resItem));
      apiSubscription.unsubscribe();
    });
  }

  putItem(item, id): void {
    const putItem = this.transformerService.toPutAttributes(item);
    const apiResponse$ = this.apiService.putItem(putItem, id);
    const apiSubscription = apiResponse$.subscribe(response => {
      const resItem = this.factoryService.createPeople({ data: response, type: 'get' });
      this.effectService.peopleUpdateItem(resItem);
      apiSubscription.unsubscribe();
    });
  }

}
