import AuthService from '../../Services/AuthService';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<any> { }

interface State {
    username: string;
    password: string;
}

export class LoginPage extends React.Component<Props, State> {
    state = {
        username: '',
        password: '',
    }

    componentDidMount() {
        this.checkJwtUser()
    }

    checkJwtUser = () => {
        const usernameFromUrl = this.props.location.pathname.replace('/', '');
        const usernameFromJwt = AuthService.getLoggedInUsername()

        if (usernameFromJwt) {
            if (usernameFromJwt === usernameFromUrl) {
                this.props.history.push(`/invite/${usernameFromJwt}`)
            } else {
                AuthService.logout()
            }
        }

        this.setState({...this.state, username: usernameFromUrl })
    }

    handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        const { username, password } = this.state;
        await AuthService.login(username, password)

        if (AuthService.getCurrentAuthenticatedUser()) {
            this.props.history.push(`/invite/${username}`)
        }
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ password: event.currentTarget.value });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.password} onChange={this.handleChange} />
                <input type="submit" value="Submit" />
            </form>
        )
    }
}