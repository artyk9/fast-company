import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Main from './components/layout/main';
import Login from './components/layout/login';
import Users from './components/layout/users';

const App = () => {
   return (
      <div className="p-2">
         <NavBar />
         <Switch>
            <Route path="/login/:type?" component={Login} />
            <Route path="/users/:userId?/:edit?" component={Users} />
            <Route exact path="/" component={Main} />
            <Redirect to="/" />
         </Switch>
      </div>
   );
};

export default App;
