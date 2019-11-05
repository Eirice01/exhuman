import './app.less'
import React from 'react'
import { HashRouter as Router, Switch, Route} from 'react-router-dom'
import { HGroup, VGroup } from 'v-block.lite/layout'
import Statics from './statics'
import Details from './details';
import MapBox from './mapbox';
import HeaderView from '../modules/header'
import Find from '../modules/popFind'
import Control from '../modules/popControl'
import Person from '../modules/person'
import Result from '../modules/result'
const Header = ({ title }) => (
  <HGroup className="header" verticalAlign="center" padding="5px 15px">
    <HeaderView></HeaderView>
  </HGroup>
);

const Main = ({ children }) => (
  <HGroup className="main" verticalAlign="stretch" gap={5} flex style={{height:"calc(100% - 90px)",overflow:"hidden"}}>
    <Statics/>
    <MapBox/>
    <Details/>
  </HGroup>
);
const App = () => (
  <Router>
    <VGroup height="100%" horizontalAlign="stretch" gap={5}>
      <Header/>
      <Switch>
        <Route path="/"  component={Main} exact/>
        <Route path="/find" component={Find}/>
        <Route path="/control" component={Control}/>
        <Route path="/person" component={Person}/>
        <Route path="/result/:type" component={Result}/>
      </Switch>
    </VGroup>
  </Router>
);
export default App
