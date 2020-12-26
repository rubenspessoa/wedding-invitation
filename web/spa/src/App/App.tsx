import { InvitationPage } from './Components/InvitationPage/InvitationPage';
import { LoginPage } from './Components/LoginPage/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route path='/invite/:name' component={InvitationPage} />
      <Route path='/:name' component={LoginPage} />
    </Switch>
  );
}

export default App;


