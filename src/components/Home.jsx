import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { 
    Row, Col, Nav, Card, Button
} from 'react-bootstrap';

import { withRouter } from "react-router-dom";


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props.state;
    }

    showFile = async (e) => {

        var file = e.target.files[0];

        if(typeof file != "undefined"){
            if (!file.name.match(/.(txt)$/i)){
                alert('not a valid file');
            }else{
    
                const reader = new FileReader();

                reader.readAsText(file)
                
                reader.onload = async (e) => { 

                    let listItem = []

                    const text = (e.target.result)
                    let dta = text.split("\n")
            
                    dta.forEach(element => {
                        listItem.push(element)
                    });

                    this.state.filledCourses = listItem;
                };
                    
    
                const filename = file.name.split('.').slice(0, -1).join('.');
        
                this.state.name = filename;

                this.props.history.push('/existing-student')
            }
        }
        e.preventDefault();

    }

    render() {
        
        return (
            <div className='my-4'>
                <Row>
                    <Col>
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                <Card.Title>American Sign Language</Card.Title>
                                <Card.Text>Please click buttons below to start</Card.Text>
                                <Button variant="success">
                                    <Link className="btn waves-effect waves-light btn-large red accent-1" to="/start">START</Link>
                                    </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(Home);