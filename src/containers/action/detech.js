
import React from 'react'

import ActionDetech from '@modules/action'
import { Switch, Route } from 'react-router-dom'



// const Test1 =() => <h1>Test1</h1>
// const UserInfo = () => (
//   <HGroup flex>
//         <div className="images-box-userinfo"></div>
//     </HGroup>
// );


// const Test1 =() => <h1>Test1</h1>


export default function Statics() {
  return (
    <Switch>
      <Route path="/find" component={ActionDetech} exact/>
      {/*<Route path="/find/userinfo" component={UserInfo} />*/}
    </Switch>
  )
}

export const Action = ActionDetech;
