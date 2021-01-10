import Covid from './Containers/Covid/Covid';
import Details from './Containers/Details/Details';
import Gifts from './Containers/Gifts/Gifts';
import Invitation from './Containers/Invitation/Invitation';
import Login from './Containers/Login/Login';
import NotFound from './Containers/NotFound/NotFound';
import { Route, Switch } from 'react-router-dom';

function App() {
	return (
    <Switch>
      <Route path="/verify/:name" component={Login} />
      <Route path="/:name/details" component={Details} />
      <Route path="/:name/covid" component={Covid} />
      <Route path="/:name/gifts" component={Gifts} />
      <Route path="/:name" component={Invitation} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;