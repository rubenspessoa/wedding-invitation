import './OurNavbar.scss';
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
          <Nav className="ml-auto navbar-font" navbar>
            <NavItem>
              <NavLink tag={Link} to={`/${AuthService.getLoggedInUsername() || ''}`}>
                Convite
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to={`/${AuthService.getLoggedInUsername() || ''}/details`}>
                Detalhes
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to={`/${AuthService.getLoggedInUsername() || ''}/covid`}>
                Covid-19
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to={`/${AuthService.getLoggedInUsername() || ''}/gifts`}>
                Presentes
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
	}
}

export default OurNavbar;