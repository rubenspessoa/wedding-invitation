import AuthService from '../../Services/AuthService';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarToggler, NavItem, NavLink } from 'reactstrap';

interface State {
	isOpen: boolean;
}

class OurNavbar extends Component<{}, State> {
    state = {
		isOpen: false
    }

    toggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	}

	render() {
		return (
		<Navbar color="light" light expand="md">
			<NavbarToggler onClick={this.toggle} />
			<Collapse isOpen={this.state.isOpen} navbar>
				<Nav className="ml-auto" navbar>
					<NavItem>
						<NavLink tag={Link} to={`/${AuthService.getLoggedInUsername() || ''}`}>Convite</NavLink>
					</NavItem>
					<NavItem>
						<NavLink tag={Link} to={`/${AuthService.getLoggedInUsername() || ''}/our-story`}>Nossa História</NavLink>
					</NavItem>
					<NavItem>
						<NavLink tag={Link} to={`/${AuthService.getLoggedInUsername() || ''}/gifts`}>Presentes</NavLink>
					</NavItem>
					<NavItem>
						<NavLink tag={Link} to={`/${AuthService.getLoggedInUsername() || ''}/schedule`}>Programação</NavLink>
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
        );
	}
}

export default OurNavbar;