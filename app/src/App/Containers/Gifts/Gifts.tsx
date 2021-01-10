import './Gifts.scss';
import OurNavbar from '../../Components/OurNavbar/OurNavbar';
import { checkJwtUser } from '../../Utils/Auth';
import { Component, Fragment } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

interface Props extends RouteComponentProps<any> {}

class Gifts extends Component<Props> {
  componentDidMount() {
    const usernameFromUrl = this.props.location.pathname.replace('/gifts', '').replace('/', '');
    checkJwtUser(usernameFromUrl, () => this.props.history.push(`/verify/${usernameFromUrl}`));
  }

  renderCovidDetails = (): JSX.Element => {
    return (
      <div className="invitation-gifts-container">
        <Container>
          <Row>
            <Col>
              <h1 className="invitation-gifts-title">Lista de Presentes</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="invitation-gifts-paragraph">Queridos convidados,</p>
              <p className="invitation-gifts-paragraph">
                Fizemos esta seção especialmente para responder às inúmeras perguntas sobre
                possíveis presentes! Graças a Deus hoje em dia já temos nosso apartamento todo
                mobiliado e, por termos uma quantidade limitada de peso que podemos levar no vôo de
                volta, não conseguiríamos levar muitos presentes físicos conosco. Por isso, fizemos
                uma lista de experiências alagoanas dentre as quais vocês podem escolher e nos
                presentear, caso assim desejem.
              </p>
              <p className="invitation-gifts-paragraph">
                Sendo assim, receberemos os seus presentes através da conta de banco a seguir:{' '}
                <br />
                Banco 260 - Nu Pagamentos S.A. <br />
                Agência: 0001 <br />
                Conta: 7980621-6 <br />
                CPF: 099.041.464-70. <br />
                Nome: Vanessa Soares Vieira
              </p>
              <p className="invitation-gifts-paragraph">
                E, para entregar seu presente, após efetuar o depósito ou transferência, pedimos que
                envie uma mensagem para um dos nossos whatsapps (O de Vanessa é +43 681 20652392 ou
                de Rubens que é +43 677 63041761) para que possamos fazer uma chamada e te agradecer
                direitinho.
              </p>
              <p className="invitation-gifts-paragraph">
                Desde já agradecemos o carinho de vocês, mas saibam que ficaremos muito felizes só
                de ter vocês conosco neste dia tão especial!
              </p>
              <p className="invitation-gifts-paragraph">Segue a lista:</p>
              <p className="invitation-gifts-paragraph">
                <ul>
                  <li>Passeio de jangada nas piscinas naturais da Pajuçara - R$ 75,00</li>
                  <li>Ida ao Cinesystem VIP com tudo incluso - R$ 150,00</li>
                  <li>Almoço e jantar no Janga - R$ 300,00</li>
                  <li>Passeio ao Santuário Natural do Rio São Francisco - R$ 600,00</li>
                  <li>Fim de semana em Maragogi - R$ 1200,00</li>
                </ul>
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
        {this.renderCovidDetails()}
      </Fragment>
    );
  }
}

export default Gifts;
