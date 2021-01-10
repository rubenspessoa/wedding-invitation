import './Covid.scss';
import OurNavbar from '../../Components/OurNavbar/OurNavbar';
import { checkJwtUser } from '../../Utils/Auth';
import { Component, Fragment } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

interface Props extends RouteComponentProps<any> {}

class Covid extends Component<Props> {
  componentDidMount() {
    window.scrollTo(0, 0);
    const usernameFromUrl = this.props.location.pathname.replace('/covid', '').replace('/', '');
    checkJwtUser(usernameFromUrl, () => this.props.history.push(`/verify/${usernameFromUrl}`));
  }

  renderCovidDetails = (): JSX.Element => {
    return (
      <div className="invitation-covid-container">
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
                Senta que lá vem textão! Infelizmente ainda estamos no meio de uma pandemia e, por
                este motivo, além de termos mudado o local da cerimônia e recepção para a Pousada
                Villa das Palmeiras, onde estaremos em um ambiente aberto e ao ar-livre, traremos
                aos convidados as seguintes recomendações:
              </p>
              <p className="invitation-covid-paragraph">
                Primeiramente, pedimos aos que sentirem quaisquer dos sintomas* da Covid-19 nos dias
                próximos ao casamento que não compareçam ao evento para que possamos evitar qualquer
                tipo de contágio aos outros convidados. Teremos convidados do grupo de risco e, por
                isso, teremos todo o cuidado. *Estes sintomas são: febre, tosse seca, cansaço,
                tensão e dores musculares, dores de garganta, perda de paladar ou olfato,
                dificuldade respiratória ou falta de ar, pressão ou dor no peito e perda da fala ou
                capacidade motora.
              </p>
              <p className="invitation-covid-paragraph">
                Pedimos que façam quarentena voluntária ou, ao mínimo, que evitem exposições
                não-essenciais durante a semana que antecede o casamento. Aos que não puderem
                fazê-lo por motivos de força maior, pedimos que se atentem ao distanciamento social.
              </p>
              <p className="invitation-covid-paragraph">
                Caso planeje se hospedar na pousada, pedimos que, durante todo o evento, utilize
                apenas o banheiro de seu chalé para diminuirmos o risco de contaminação. Caso não
                esteja hospedado(a), haverá indicação no local qual banheiro você poderá utilizar.
              </p>
              <p className="invitation-covid-paragraph">
                Estarão disponíveis para o evento máscaras descartáveis e álcool em gel em todas as
                mesas e chalés, mas, ainda pedimos que cada convidado leve suas próprias máscaras e
                as utilize sempre que estiverem em ambientes fechados e/ou enquanto estiverem
                próximos de pessoas que você não convive.
              </p>
              <p className="invitation-covid-paragraph">
                Durante a cerimônia e recepção, separaremos os assentos de acordo com o grau de
                convivência, por exemplo, a família que convive entre si sentará próxima e os amigos
                que ficarão hospedados no mesmo chalé também sentarão próximos.
              </p>
              <p className="invitation-covid-paragraph">
                Se, mesmo com todas as providências tomadas, você sentir os sintomas listados acima,
                ou se descobrir que teve contato com alguém que testou positivo para Covid-19, ou
                ainda se descobrir positivo para covid-19 nos primeiros 15 dias após a realização do
                evento, pedimos que nos avisem para que orientemos os demais convidados a tomarem os
                cuidados devidos.
              </p>
              <p className="invitation-covid-paragraph">
                Agradecemos demais a sua compreensão e colaboração para que tenhamos uma festa
                segura a todos!
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

export default Covid;
