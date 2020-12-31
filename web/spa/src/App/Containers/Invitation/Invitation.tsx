import './Invitation.scss';
import OurNavbar from '../../Components/OurNavbar/OurNavbar';
import { NullableRsvp, Rsvp } from '../../Models/Rsvp.model';
import RsvpService from '../../Services/RsvpService';
import { checkJwtUser } from '../../Utils/Auth';
import React, { Component, Fragment } from 'react';
import { RouteComponentProps } from 'react-router-dom';
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
}

class Invitation extends Component<Props, State> {
  state = {
    rsvpId: undefined,
    username: '',
    isGoing: false,
    isStayingAtHotel: false,
    havePlusOne: false,
    plusOneIsStayingAtHotel: false,
    foodAllergies: '',
  };

  componentDidMount() {
    const usernameFromUrl = this.props.location.pathname.replace('/', '');
    checkJwtUser(usernameFromUrl, () => this.props.history.push(`/verify/${usernameFromUrl}`));
    this.setState({ username: usernameFromUrl }, () => this.shouldCheckForRsvp());
  }

  async componentDidUpdate() {
    this.shouldCheckForRsvp();
  }

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
                  <p className="invitation-rsvp-text">Nome do convidado:</p>
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
                  <p className="invitation-rsvp-text">Ficará na pousada*?</p>
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
              <Row>
                <Col>
                  <p className="invitation-rsvp-text">
                    Observações (ex.: restrição alimentar, nome do(a) acompanhante, etc):
                  </p>
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
          <Row>
            <Col>
              <p className="invitation-rsvp-observation">
                *Os valores relacionados às estadias devem ser transferidos para esta conta
                bancária: <br /> <br />
                Banco 260 - Nu Pagamentos S.A. <br />
                Agência: 0001 <br />
                Conta: 7980621-6 <br />
                CPF: 099.041.464-70. <br />
                Nome: Vanessa Soares Vieira
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <img src="/img/thx.gif" alt="thank you" className="invitation-rsvp-image" />
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
                Para mais informações, avance às próximas seções desta mesma página.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  renderDetails = (): JSX.Element => {
    return (
      <div className="invitation-details-container">
        <Container>
          <Row>
            <Col>
              <h1 className="invitation-details-title">Os detalhes</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="invitation-details-paragraph">
                Nós reservamos toda a pousada para acomodar os convidados que desejam passar conosco
                esse final de semana que será tão especial para nós!
              </p>
              <p className="invitation-details-paragraph">
                A estadia se dará na Pousada Villa das Palmeiras, que fica localizada na rodovia
                AL-101 NORTE, S/N - Ipioca, AL. CEP 57039-700. Iniciaremos o check-in às 14:00 do
                dia 19/02 e faremos checkout às 12:00 do dia 21/02. Como a cerimônia e a recepção
                serão feitas no mesmo local, poderemos curtir a festa, dormir, tomar um belo café da
                manhã no domingo e voltar para casa seguros!
              </p>
              <p className="invitation-details-paragraph">
                Para fazer sua reserva, cada convidado deverá nos transferir* o valor de
                R$125,00/pessoa até o dia 20 de Janeiro de 2021. Nós repassaremos o valor para o
                dono da pousada e distribuiremos cada convidado e seus acompanhantes nos chalés para
                o maior conforto de todos.
              </p>
              <p className="invitation-details-paragraph">
                A estadia incluirá café da manhã regional, porém, cada convidado arcará com os
                custos das suas outras refeições, com a exceção do jantar no dia 20/02, que será
                realizado durante a recepção do casamento. Mas, relaxe! Nas proximidades da pousada
                existem várias opções de restaurantes que estarão disponíveis durante o fim de semana!
              </p>
              <p className="invitation-details-paragraph">
                E... além da pousada possuir uma piscina, estaremos bem pertinho da praia de Ipioca,
                então é beeem recomendado levar roupa de banho, toalha, canga, óculos de sol,
                chapéu, etc! Também recomendamos beber muita água e usar protetor solar porque vai
                tá quente, viu?
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  renderCovidDetails = (): JSX.Element => {
    return (
      <div className="invitation-message-container">
        <Container>
          <Row>
            <Col>
              <img src="/img/coroa.png" alt="flower" className="invitation-message-image" />
              <h1 className="invitation-message-title">Cuidados com Covid-19</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="invitation-covid-paragraph">
                Senta que lá vem textão! Infelizmente ainda estamos no meio de uma pandemia e, por este motivo, além de
                termos mudado o local da cerimônia e recepção para a Pousada Villa das Palmeiras,
                onde estaremos em um ambiente aberto e ao ar-livre, traremos aos convidados as
                seguintes recomendações para segurança de todos:
              </p>
              <ul>
                <li className="invitation-covid-paragraph">
                  Para aqueles que puderem, recomendamos quarentena voluntária ou no mínimo evitar
                  aglomerações e/ou saídas durante a semana anterior ao casamento. Aos que não
                  puderem, recomendamos que atentem-se ao distanciamento social.
                </li>
                <li className="invitation-covid-paragraph">
                  Pedimos aos que estiverem sentindo quaisquer dos sintomas da Covid-19 nos dias
                  próximos ao casamento, isto é, febre, tosse seca, cansaço, tensão e dores musculares,
                  dores de garganta, perda de paladar ou olfato, dificuldade respiratória ou falta
                  de ar, pressão ou dor no peito e perda da fala ou capacidade motora, que não
                  compareçam ao evento para evitar qualquer tipo de contágio.
                </li>
                <li className="invitation-covid-paragraph">
                  Se você estiver hospedado(a) na pousada, pedimos que durante todo o evento você
                  utilize apenas o banheiro de seu chalé, para diminuir o risco de contaminação.
                  Caso não esteja hospedado(a), haverá indicação no local qual banheiro você pode
                  utilizar.
                </li>
                <li className="invitation-covid-paragraph">
                  Estarão disponíveis para o evento máscaras descartáveis e álcool em gel em todas
                  as mesas e chalés, mas, ainda pedimos que cada convidado leve sua(s) próprias máscara(s) e as utilize sempre
                  que estiverem em ambientes fechados e/ou enquanto estiverem próximos de pessoas que você não convive.
                </li>
                <li className="invitation-covid-paragraph">
                  Durante a cerimônia e recepção, separaremos os assentos de acordo com o
                  grau de convivência, por exemplo, a família que convive entre si sentará próxima e
                  os amigos que ficarão hospedados no mesmo chalé também sentarão próximos.
                </li>
                <li className="invitation-covid-paragraph">
                  Se, por algum motivo, você descobrir que houve contato com alguém que testou
                  positivo para Covid-19 ou que você testou positivo após a realização do evento,
                  pedimos que nos avisem para que informemos todos os demais convidados.
                </li>

                <p className="invitation-covid-paragraph">Agradecemos a compreensão! Se a gente se organizar direitinho, todo mundo se diverte!</p>
              </ul>
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
        {this.renderDetails()}
        {this.renderCovidDetails()}
        {this.renderForm()}
      </Fragment>
    );
  }
}

export default Invitation;
