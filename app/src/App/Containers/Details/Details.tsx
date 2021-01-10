import './Details.scss';
import OurNavbar from '../../Components/OurNavbar/OurNavbar';
import { checkJwtUser } from '../../Utils/Auth';
import { Component, Fragment } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

interface Props extends RouteComponentProps<any> {}

class Details extends Component<Props> {
  componentDidMount() {
    window.scrollTo(0, 0);
    const usernameFromUrl = this.props.location.pathname.replace('/details', '').replace('/', '');
    checkJwtUser(usernameFromUrl, () => this.props.history.push(`/verify/${usernameFromUrl}`));
  }

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
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <p className="invitation-details-paragraph">
                Nós reservamos toda a pousada para acomodar os convidados que desejam passar conosco
                esse final de semana que será tão especial para nós!
              </p>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6} className="my-auto">
              <p className="invitation-details-paragraph">
                A estadia se dará na Pousada Villa das Palmeiras, que fica localizada na rodovia
                AL-101 NORTE, S/N - Ipioca, AL. CEP 57039-700. Iniciaremos o check-in às 14:00 do
                dia 19/02 e faremos checkout às 12:00 do dia 21/02. Como a cerimônia e a recepção
                serão feitas no mesmo local, poderemos curtir a festa, dormir, tomar um belo café da
                manhã no domingo e voltar para casa seguros!
              </p>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <img src="/img/pousada1.png" alt="pousada foto 1" className="img-fluid" />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <img src="/img/pousada4.png" alt="pousada foto 2" className="img-fluid" />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6} className="my-auto">
              <p className="invitation-details-paragraph">
                Para fazer sua reserva, cada convidado deverá nos transferir* o valor de
                R$125,00/pessoa até o dia 20 de Janeiro de 2021. Nós repassaremos o valor para o
                dono da pousada e distribuiremos cada convidado e seus acompanhantes nos chalés para
                o maior conforto de todos.
              </p>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6} className="my-auto">
              <p className="invitation-details-paragraph">
                A estadia incluirá café da manhã regional, porém, cada convidado arcará com os
                custos das suas outras refeições, com a exceção do jantar no dia 20/02, que será
                realizado durante a recepção do casamento. Mas, relaxe! Nas proximidades da pousada
                existem várias opções de restaurantes que estarão disponíveis durante o fim de
                semana!
              </p>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <img src="/img/pousada2.png" alt="pousada foto 3" className="img-fluid" />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <img src="/img/pousada3.png" alt="pousada foto 4" className="img-fluid" />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6} className="my-auto">
              <p className="invitation-details-paragraph">
                E... além da pousada possuir uma piscina, estaremos bem pertinho da praia de Ipioca,
                então é beeem recomendado levar roupa de banho, toalha, canga, óculos de sol,
                chapéu, etc! Também recomendamos beber muita água e usar protetor solar porque vai
                tá quente, viu?
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="invitation-details-paragraph">
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
  };

  render() {
    return (
      <Fragment>
        <OurNavbar />
        {this.renderDetails()}
      </Fragment>
    );
  }
}

export default Details;
