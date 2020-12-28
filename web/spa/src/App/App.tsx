import Gifts from './Containers/Gifts/Gifts';
import Invitation from './Containers/Invitation/Invitation';
import Login from './Containers/Login/Login';
import NotFound from './Containers/NotFound/NotFound';
import OurStory from './Containers/OurStory/OurStory';
import Schedule from './Containers/Schedule/Schedule';
import { Route, Switch } from 'react-router-dom';

function App() {
	return (
		<Switch>
			<Route path='/verify/:name' component={Login} />
			<Route path='/:name/schedule' component={Schedule} />
			<Route path='/:name/gifts' component={Gifts} />
			<Route path='/:name/our-story' component={OurStory} />
			<Route path='/:name' component={Invitation} />
			<Route component={NotFound} />
		</Switch>
	);
}

export default App;