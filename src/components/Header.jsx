import React from 'react';
import ReactDOM from 'react-dom';
import { 
    Row, Col, Nav, Card
 } from 'react-bootstrap';

class Header extends React.Component {
    render() {
      return (
        <div>
            <Row>
                <Col lg={12}>
                    <Card className="theme-bg" style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Title>SOUTHEAST MISSOURI STATE UNIVERSITY</Card.Title>
                            <br/>
                            <Card.Title>CS630 Human Computer Interaction</Card.Title>
                            <Card.Text>Professor: Dr. Suhair Amer</Card.Text>
                            <Card.Text>Project: American Sign Language</Card.Text>
                            <Card.Text>Developer: Muhammad Iqbal Hussain</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
      );
    }
}

export default Header;