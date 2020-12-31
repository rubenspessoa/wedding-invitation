import './Schedule.scss';
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
		return (
      <div className="schedule-image">
        <OurNavbar />
      </div>
    );
	}
}

export default Schedule;