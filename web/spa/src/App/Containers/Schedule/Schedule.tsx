import OurNavbar from '../../Components/OurNavbar/OurNavbar';
import { checkJwtUser } from '../../Utils/Auth';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<any> { }

class Schedule extends Component<Props> {
    componentDidMount() {
		const usernameFromUrl = this.props.location.pathname.replace('/schedule', '').replace('/', '');
		checkJwtUser(usernameFromUrl, () => this.props.history.push(`/verify/${usernameFromUrl}`))
    }

	render() {
        return(
			<div>
				<OurNavbar>
					<h1>This will be the schedule</h1>
				</OurNavbar>
			</div>
        );
	}
}

export default Schedule;