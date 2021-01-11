import './Login.scss';
import AuthService from '../../Services/AuthService';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Card, CardImg, Col, Form, FormGroup, Input, Row } from 'reactstrap';

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
          <Row className="login-form-container">
            <Col
              md={{ size: 6, offset: 3 }}
              lg={{ size: 6, offset: 3 }}
              xl={{ size: 6, offset: 3 }}
            >
              <Card body outline color="grey">
                <CardImg src="/img/login-header-image.jpg" alt="vanessa e rubens dando as mãos" />
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormGroup>
                    <Row>
                      <Col>
                        <h1 className="login-title">
                          Seja bem-vindo
                        </h1>
                        <p className="login-paragraph">
                          Aqui você poderá confirmar sua presença, bem como terá acesso à todas as
                          informações sobre o evento.
                        </p>
                        <p className="login-paragraph">
                          Insira a senha do seu convite para prosseguir (note que a senha diferencia
                          entre letras maiúsculas e minúsculas):
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        md={{ size: 6, offset: 3 }}
                        lg={{ size: 8, offset: 2 }}
                        xl={{ size: 8, offset: 2 }}
                      >
                        <Input
                          type="text"
                          bsSize="lg"
                          invalid={this.isUserNotAuthenticated()}
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <Row>
                    <Col>
                      <Button type="submit" size="lg" className="login-button-color">
                        Prosseguir
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>
          </Row>
        );
    }
}

export default Login;