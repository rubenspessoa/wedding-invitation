import './NotFound.scss';
import { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
class NotFound extends Component {
	render() {
        return (
        <div className='not-found-container'>
            <Container >
                <Row>
                    <Col>
                        <h1 className='not-found-title'>Esta página não foi encontrada.</h1>
                        <h3 className='not-found-subtitle'>Por favor, utilize o link compartilhado diretamente a você ou peça ajuda aos noivos.</h3>
                    </Col>
                </Row>
            </Container>
        </div>
	);
	}
}

export default NotFound;