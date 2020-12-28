import OurNavbar from '../../Components/OurNavbar/OurNavbar';
import { checkJwtUser } from '../../Utils/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<any> { }

class Gifts extends Component<Props> {

	componentDidMount() {
		const usernameFromUrl = this.props.location.pathname.replace('/gifts', '').replace('/', '');
		checkJwtUser(usernameFromUrl, () => this.props.history.push(`/verify/${usernameFromUrl}`))
	}

	render() {
		return(
			<div>
				<OurNavbar>
					<h1>Gifts give me them</h1>
				</OurNavbar>
			</div>
		);
	}
}

export default Gifts;