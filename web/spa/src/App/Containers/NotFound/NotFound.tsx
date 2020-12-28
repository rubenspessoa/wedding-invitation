import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';

class NotFound extends Component {
	render() {
	return(
        <Container>
            <Row>
                <Col>
                    <h1>Esta página não foi encontrada.</h1>
                    <h2>Por favor, utilize o link compartilhado diretamente a você ou contate os criadores para ajuda.</h2>
                </Col>
            </Row>
        </Container>
	);
	}
}

export default NotFound;