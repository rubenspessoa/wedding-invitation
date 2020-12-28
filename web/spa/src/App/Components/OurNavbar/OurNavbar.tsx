import AuthService from '../../Services/AuthService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Collapse, Container, Nav, Navbar, NavbarToggler, NavItem, NavLink, Row } from 'reactstrap';

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
			<div>
				<Navbar color="inverse" light expand="md">
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
				<Container>
					<Row>
						<Col>
							<img src={process.env.PUBLIC_URL + '/img/header-image.jpg'} alt="Foto dos dois" />
							{this.props.children}
						</Col>
					</Row>
				</Container>
			</div>

        );
	}
}

export default OurNavbar;