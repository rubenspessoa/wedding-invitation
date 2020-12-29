import OurNavbar from '../../Components/OurNavbar/OurNavbar';
import { checkJwtUser } from '../../Utils/Auth';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<any> { }

class OurStory extends Component<Props> {
    componentDidMount() {
        const usernameFromUrl = this.props.location.pathname.replace('/our-story', '').replace('/', '');
		checkJwtUser(usernameFromUrl, () => this.props.history.push(`/verify/${usernameFromUrl}`))
    }

	render() {
        return(
            <div>
                <OurNavbar>
                    <h1>Our History</h1>
                </OurNavbar>
            </div>
        );
	}
}

export default OurStory;