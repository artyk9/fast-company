import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Main from './components/layout/main';
import Login from './components/layout/login';
import Users from './components/layout/users';

function App() {
   return (
      <div>
         <NavBar />
         <Switch>
            <Route path="/users/:userId?/:edit?" component={Users} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/" exact component={Main} />
            <Redirect to="/" />
         </Switch>
      </div>
   );
}

export default App;
