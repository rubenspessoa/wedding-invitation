import './Invitation.scss';
import OurNavbar from '../../Components/OurNavbar/OurNavbar';
import { NullableRsvp, Rsvp } from '../../Models/Rsvp.model';
import { NullableUser } from '../../Models/User.model';
import AuthService from '../../Services/AuthService';
import RsvpService from '../../Services/RsvpService';
import UserService from '../../Services/UserService';
import { checkJwtUser } from '../../Utils/Auth';
import React, { Component, Fragment } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';

interface Props extends RouteComponentProps<any> {}

interface State {
  rsvpId?: string;
  username: string;
  isGoing: boolean;
  isStayingAtHotel: boolean;
  havePlusOne: boolean;
  plusOneIsStayingAtHotel: boolean;
  foodAllergies: string;
  userInfo?: NullableUser;
}

class Invitation extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      rsvpId: undefined,
      username: '',
      isGoing: false,
      isStayingAtHotel: false,
      havePlusOne: false,
      plusOneIsStayingAtHotel: false,
      foodAllergies: '',
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    const usernameFromUrl = this.props.location.pathname.replace('/', '');
    await this.getUserInformation(usernameFromUrl);
    checkJwtUser(usernameFromUrl, () => this.props.history.push(`/verify/${usernameFromUrl}`));
    this.setState({ username: usernameFromUrl }, () => this.shouldCheckForRsvp());
  }

  async componentDidUpdate() {
    this.shouldCheckForRsvp();
  }

  getUserInformation = async (username: string) => {
    const userInfo: NullableUser = await UserService.get(username);
    this.setState({ userInfo });
  };

  shouldCheckForRsvp = () => {
    if (this.state.username !== '' && this.state.rsvpId === undefined) {
      this.checkForExistingRsvp();
    }
  };

  checkForExistingRsvp = async () => {
    const rsvp: NullableRsvp = await RsvpService.get(this.state.username);

    if (rsvp) {
      this.setState({
        rsvpId: rsvp._id,
        isGoing: rsvp.isGoing,
        isStayingAtHotel: rsvp.isStayingAtHotel,
        havePlusOne: rsvp.havePlusOne,
        plusOneIsStayingAtHotel: rsvp.plusOneIsStayingAtHotel,
        foodAllergies: rsvp.foodAllergies,
      });
    }
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (this.state.rsvpId !== undefined) {
      const rsvp: Rsvp = {
        _id: this.state.rsvpId,
        name: this.state.username,
        isGoing: this.state.isGoing,
        isStayingAtHotel: this.state.isStayingAtHotel,
        havePlusOne: this.state.havePlusOne,
        plusOneIsStayingAtHotel: this.state.plusOneIsStayingAtHotel,
        foodAllergies: this.state.foodAllergies,
      };
      RsvpService.update(rsvp);
    } else {
      RsvpService.post(
        this.state.username,
        this.state.isGoing,
        this.state.isStayingAtHotel,
        this.state.havePlusOne,
        this.state.plusOneIsStayingAtHotel,
        this.state.foodAllergies,
      );
    }
  };

  handleChange: React.FormEventHandler<HTMLInputElement> = (event) => {
    const { name } = event.currentTarget;
    const value =
      event.currentTarget.type === 'checkbox'
        ? event.currentTarget.checked
        : event.currentTarget.value;

    this.setState({ ...this.state, [name]: value });
  };

  renderPlusOneSection(): JSX.Element | undefined {
    if (this.state.userInfo && this.state.userInfo.havePlusOne) {
      return (
        <Fragment>
          <Row>
            <Col xs={10} sm={10}>
              <p className="invitation-rsvp-text">Levará acompanhante?</p>
            </Col>
            <Col xs={2} sm={2}>
              <Input
                name="havePlusOne"
                type="checkbox"
                checked={this.state.havePlusOne}
                onChange={this.handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={10} sm={10}>
              <p className="invitation-rsvp-text">Acompanhante ficará na pousada*?</p>
            </Col>
            <Col xs={2} sm={2}>
              <Input
                name="plusOneIsStayingAtHotel"
                type="checkbox"
                checked={this.state.plusOneIsStayingAtHotel}
                onChange={this.handleChange}
              />
            </Col>
          </Row>
        </Fragment>
      );
    }

    return undefined;
  }

  renderForm(): JSX.Element {
    return (
      <div className="invitation-rsvp-container">
        <Container>
          <Row>
            <Col>
              <img src="/img/rsvp.gif" alt="rsvp" className="invitation-rsvp-image" />
            </Col>
          </Row>
          <Form onSubmit={this.handleSubmit} className="invitation-rsvp-form">
            <FormGroup>
              <Row>
                <Col xs={6} sm={6}>
                  <p className="invitation-rsvp-text">Nome do(a) convidado(a):</p>
                </Col>
                <Col xs={6} sm={6}>
                  <Input
                    name="isGoing"
                    type="text"
                    value={this.state.username}
                    disabled
                    className="invitation-rsvp-text"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={10} sm={10}>
                  <p className="invitation-rsvp-text">Comparecerá?</p>
                </Col>
                <Col xs={2} sm={2}>
                  <Input
                    name="isGoing"
                    type="checkbox"
                    checked={this.state.isGoing}
                    onChange={this.handleChange}
                    className="invitation-rsvp-text"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={10} sm={10}>
                  <p className="invitation-rsvp-text">Ficará na pousada?</p>
                </Col>
                <Col xs={2} sm={2}>
                  <Input
                    name="isStayingAtHotel"
                    type="checkbox"
                    checked={this.state.isStayingAtHotel}
                    onChange={this.handleChange}
                  />
                </Col>
              </Row>
              {this.renderPlusOneSection()}
              <Row>
                <Col>
                  {this.state.userInfo && this.state.userInfo.havePlusOne && (
                    <p className="invitation-rsvp-text">
                      Observações (ex.: restrição alimentar, nome do(a) acompanhante, etc):
                    </p>
                  )}
                  {(!this.state.userInfo || !this.state.userInfo.havePlusOne) && (
                    <p className="invitation-rsvp-text">
                      Observações (ex.: restrições alimentares):
                    </p>
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Input
                    name="foodAllergies"
                    type="textarea"
                    value={this.state.foodAllergies}
                    onChange={this.handleChange}
                  />
                </Col>
              </Row>
              <Input type="submit" value="Enviar" className="invitation-rsvp-submit" />
            </FormGroup>
          </Form>
        </Container>
        <Container fluid>
          <Row>
            <Col className="invitation-thank-you-image">
              <img src="/img/thx.gif" alt="thank you" className="invitation-thank-you-gif" />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  renderHeader = (): JSX.Element => {
    return (
      <div className="invitation-image">
        <OurNavbar />
        <h1 className="invitation-title">Vanessa & Rubens</h1>
        <img src="/img/ourwedding_wh.gif" alt="rsvp" className="invitation-title-image" />
      </div>
    );
  };

  renderInvitation = (): JSX.Element => {
    return (
      <div className="invitation-message-container">
        <Container>
          <Row>
            <Col>
              <img src="/img/coroa.png" alt="flower" className="invitation-message-image" />
              <h1 className="invitation-message-title">Convite</h1>
              <h3 className="invitation-message-subtitle">
                E ainda que tivesse o dom de profecia, e conhecesse todos os mistérios e toda a
                ciência, e ainda que tivesse toda a fé, de maneira tal que transportasse os montes,
                e não tivesse amor, nada seria. <br />
                (1 Coríntios 13:2)
              </h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="invitation-message-paragraph">
                Convidamos você para a cerimônia do nosso casamento que será realizada às 15:00 do
                dia 20 de Fevereiro de 2021 na Pousada Villa das Palmeiras em Ipioca/AL. Após a
                cerimônia, os convidados serão recepcionados no mesmo local.
              </p>
              <p className="invitation-message-paragraph">
                Também o(a) convidamos para passar o fim de semana da cerimônia conosco na pousada.
                Para mais informações, acesse as páginas:{' '}
                <Link to={`/${AuthService.getLoggedInUsername() || ''}/details`}>Detalhes</Link> e{' '}
                <Link to={`/${AuthService.getLoggedInUsername() || ''}/covid`}>Covid-19</Link>. Por
                fim, pedimos que confirme a sua presença na próxima seção desta mesma página.
              </p>
              <p className="invitation-message-ps">
                Traje: Esporte Fino. <br />
                Cor exclusiva para madrinhas: Marsala.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  render() {
    return (
      <Fragment>
        {this.renderHeader()}
        {this.renderInvitation()}
        {this.renderForm()}
      </Fragment>
    );
  }
}

export default Invitation;
