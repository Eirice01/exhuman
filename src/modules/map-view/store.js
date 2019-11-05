import { action, observable } from 'mobx'

import { SymbolFor } from '@commons/tools'
import { getData } from '@services/map'

const [ SINGLETON, _instance_ ] = [
  SymbolFor('map-view-store'),
  SymbolFor('map-view-store::instance')
];

class Store {
  static [_instance_];

  static getInstance() {
    if(!Store[_instance_])
      Store[_instance_] = new Store(SINGLETON);

    return Store[_instance_];
  }

  @observable.ref mapdata;

  constructor(singleton) {
    if(singleton !== SINGLETON)
      throw new Error('This is a SINGLETON class, Please use getInstance() method!');
  }

  @action
  getMapData() {
    getData().then(data => this.mapdata = data);
  }

}

export default Store;
export const instance = Store.getInstance;
