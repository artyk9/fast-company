import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/navBar';
import Main from './components/layout/main';
import Login from './components/layout/login';
import Users from './components/layout/users';

function App() {
   return (
      <div>
         <NavBar />
         <Switch>
            <Route path="/login" component={Login} />
            <Route path="/users/:userId?" component={Users} />
            <Route exact path="/" component={Main} />
         </Switch>
      </div>
   );
}

export default App;
