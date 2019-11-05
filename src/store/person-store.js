import { observable, action, runInAction} from 'mobx'
import { fetchMapStyle } from '@services/people.js'
class PersonStore {

  @observable
  personInfo={
                fuullName:'',
                name:'',
                tel:'',
                percent:''
           };
  
  @observable.ref mapStyleJSON = null;
  constructor() {
    this.fetchMapJSON();
    const infoData = sessionStorage.getItem('infoData');
    if (infoData) {
      this.personInfo = JSON.parse(infoData)
    } else {
      this.personInfo={
        fuullName:'',
        name:'',
        tel:'',
        percent:''
      };
    }
  }
  @action getPersonInfo(data){
    this.personInfo.name=data.name
    this.personInfo.tel=data.tel
    this.personInfo.percent=data.percent
    this.personInfo.fuullName=data.fuullName
    sessionStorage.setItem('infoData',JSON.stringify(data))
  }
  @action
  async fetchMapJSON(){
    this.mapStyleJSON = {};
    try{
      const mapJSON = await fetchMapStyle();
      runInAction(
        () => {
          this.mapStyleJSON = mapJSON;
        }
      )
    } catch (err) {
      console.log(err)
    }
  }
}

const store = new PersonStore();

export default store;

