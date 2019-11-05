import { observable, action} from 'mobx'


class ResultStore {

  @observable showResult=true

  @action changeShowResult(val){
    this.showResult=val;
  }
}

const store = new ResultStore();

export default store;
