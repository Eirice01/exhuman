/*
 * Created on Tue Aug 20 2019
 * Authored by zonebond
 * @github - github.com/zonebond
 * @e-mail - zonebond@126.com
 */
import { observable, computed, action } from 'mobx'

import { fetchPeoples, fetchAbnormalPeople, fetchExtremePeople, fetchImportantPeople, NonServerData as _NonServerData } from '@services/people'



class PeopleStore {

  @observable abnormals;
  @observable extremes;
  @observable importants;
  @computed get peoples() {
    // this.abnormals + this.extremes + this.importants;
    return [];
  }

  @action
  async getAbnormals() {
    this.abnormals = await fetchAbnormalPeople();
  }

  @action
  async getExtremes() {
    this.extremes = await fetchExtremePeople();
  }

  @action
  async getImportants() {
    this.importants = await fetchImportantPeople();
  }

  @action
  async getPeoples() {
    const { abnormals, extremes, importants } = await fetchPeoples();
    this.abnormals  = abnormals;
    this.extremes   = extremes;
    this.importants = importants;
  }

}

const store = new PeopleStore();

export default store;

export const NonServerData = _NonServerData
