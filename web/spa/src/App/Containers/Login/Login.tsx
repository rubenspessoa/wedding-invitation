import './Login.scss';
import AuthService from '../../Services/AuthService';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Card, CardImg, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';

interface Props extends RouteComponentProps<any> { }

interface State {
    username: string;
    password: string;
    isAuthenticated?: boolean;
}

class Login extends Component<Props, State> {
    state = {
        username: '',
        password: '',
        isAuthenticated: undefined
    }

    componentDidMount() {
        this.checkJwtUser()
    }

    checkJwtUser = () => {
        const usernameFromUrl = this.props.location.pathname.replace('/verify/', '');
        const usernameFromJwt = AuthService.getLoggedInUsername()

        if (usernameFromJwt) {
            if (usernameFromJwt === usernameFromUrl) {
                this.props.history.push(`/${usernameFromJwt}`)
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
            this.props.history.push(`/${username}`)
            this.setState({ isAuthenticated: true })
        } else {
            this.setState({ isAuthenticated: false })
        }
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ password: event.currentTarget.value });
    }

    isUserNotAuthenticated = (): boolean | undefined => {
        if (this.state.isAuthenticated !== undefined) {
            return this.state.isAuthenticated === false;
        }

        return undefined;
    }

    render() {
        return (
            <div className={'form-container'}>
                <Container>
                    <Card body outline color="grey">
                        <CardImg top width="100%" src="/img/header-login.jpg" alt="Card image cap" />
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <h1>Seja bem-vindo(a) ao site do nosso casamento!</h1>
                                        <p>Aqui você poderá confirmar sua presença, bem como terá acesso à todas as informações sobre o evento.</p>
                                        <p>Insira a senha do seu convite para prosseguir:</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={{ size: 6, offset: 3 }} lg={{ size: 6, offset: 3 }} xl={{ size: 6, offset: 3 }}>
                                            <Input type="text" bsSize="lg" invalid={this.isUserNotAuthenticated()} value={this.state.password} onChange={this.handleChange} />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <Row>
                                <Col>
                                    <Button type="submit" size='lg' className="button-color">Avançar</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Container>
            </div>
        )
    }
}

export default Login;