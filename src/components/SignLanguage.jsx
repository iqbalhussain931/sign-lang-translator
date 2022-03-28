import React, { Component, useContext } from 'react';
import { 
    Button, Row, Col, Form, ListGroup, Alert, Card, Image
 } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import { jsx } from '@emotion/react';

// UI


class SignLanguage extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props.state;
        
    }

    onUserInputChange(event) {
        this.setState({userInput: event.target.value})
    }

    onUserInput(event) {
        event.preventDefault();

        this.setState({translatorTyping: true})
        
        if (this.state.userInput != "") {
            this.generateMessage(this.state.userInput)
        }
    }

    generateMessage(userMessage) {
        let messages = this.state.messages;

        messages.push({
            author: "User",
            translator: false,
            avatar: "avatar3",
            message: userMessage,
            time: this.formatTime(new Date())
        })

        this.setState({messages: messages})

        setTimeout(() => {
            let message = {
                author: "Muhammad Iqbal Hussain",
                translator: true,
                avatar: "avatar1",
                words: this.translate(userMessage),
                time: this.formatTime(new Date())
            };

            messages.push(message)

            this.setState({messages: messages})

            // console.log("State", this.state);
    
            this.setState({translatorTyping: false})
        }, 2000);
        
    }

    translate(sentence) {

        let messages = []

        let words = sentence.match(/\b(\w+)\b/g)

        words.map( (word) => {

            let characters = Array.from(word);
            let wordChars = [];

            characters.map( ( character ) => {

                console.log(character)
                
                let validaChar = character.match("^[a-zA-Z]*$") ? true : false;

                if(validaChar){
                    let char = character.toLowerCase()
                    wordChars.push(char)
                }
            })

            messages.push({
                word: word,
                chars: wordChars
            })

        })

        return messages;

    }

    runCommand(event) {
        let sentence = event.target.dataset.value;

        this.setState({translatorTyping: true})

        if (sentence !== "") {

            this.generateMessage(sentence)
        }
    }

    formatTime(date){

        let d = new Date(date);
        var h = d.getHours(), m = d.getMinutes(), l="AM";
        if(h > 12){
          h = h - 12;
        }
        if(h < 10){
          h = h;
        }
        if(m < 10){
          m = '0'+m;
        }
        if(d.getHours() >= 12){
          l="PM"
        }else{
          l="AM"
        }
      
        return h+':'+m+' '+l;
      
    }

    render(){
        return (
            <Row>
                <Row className='my-4'>
                    <Col sm="9">
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <div className="py-2 px-4 border-bottom d-none d-lg-block theme-bg">
                                        <div className="d-flex align-items-center py-1">
                                            <div className="position-relative">
                                                <Card.Img variant="top" src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" width="40" height="40" />
                                            </div>
                                            <div className="flex-grow-1 pl-3 chat-title">
                                                <strong>Muhammad Iqbal Hussain</strong>
                                                
                                                <div className="text-muted small">
                                                    <em>
                                                        {
                                                            this.state.translatorTyping
                                                            ?
                                                            (
                                                                <>Typing...</>
                                                            )
                                                            :
                                                            (
                                                                <></>
                                                            )
                                                        }
                                                    </em>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Title>
                                <Row>
                                    <Col sm="12">
                                        <div className="position-relative">
                                            <div className="chat-messages p-4">

                                                {
                                                    this.state?.messages.map( (message, i) => {
                                                        if (message?.translator) {
                                                            return (
                                                                <div key={i} className="chat-message-right pb-4">
                                                                    <div>
                                                                        <Card.Img variant="right" src={`https://bootdey.com/img/Content/avatar/${message.avatar}.png`} className="rounded-circle mr-1" width="40" height="40" />
                                                                        <div className="text-muted small text-nowrap mt-2">{message.time}</div>
                                                                    </div>
                                                                    <div className="flex-shrink-1 bg-light text rounded py-2 px-3 mx-3">
                                                                        <div className="font-weight-bold mb-1"><b>{message.author}</b></div>
                                                                        <div className='group-message'>
                                                                            {
                                                                                message.words.map((word, j) => {
                                                                                    return (
                                                                                        <div key={j} className="single-message">
                                                                                            <div className='single-message-word'>
                                                                                                {word.word}
                                                                                            </div>
                                                                                            <div className='single-message-chars'>
                                                                                                {
                                                                                                    word.chars.map((char, k) => {
                                                                                                        return <Image key={k} src={`./assets/${char}.jpg`} />
                                                                                                    })
                                                                                                }
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        } else {
                                                            return (
                                                                <div key={i} className="chat-message-left pb-4">
                                                                    <div>
                                                                        <Card.Img variant="right" src={`https://bootdey.com/img/Content/avatar/${message.avatar}.png`} className="rounded-circle mr-1" width="40" height="40" />
                                                                        <div className="text-muted small text-nowrap mt-2">{message.time}</div>
                                                                    </div>
                                                                    <div className="flex-shrink-1 bg-light text rounded py-2 px-3 mx-3">
                                                                        <div className="font-weight-bold mb-1"><b>{message.author}</b></div>
                                                                        {message?.message}
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                }

                                                
                                                
                                            </div>
                                            <Form className="flex-grow-0 py-3 border-top" onSubmit={this.onUserInput.bind(this)}>
                                                <div className="input-group">
                                                    <Form.Control type="text" placeholder="Type your message" onChange={this.onUserInputChange.bind(this)} />
                                                    <Button variant="primary" type="submit">
                                                        Send
                                                    </Button>
                                                </div>
                                            </Form>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        {
                            this.state?.errors
                        }
                    </Col>
                    <Col sm="3">
                        <h4>Available Commands</h4>
                        <ListGroup className='aval-cmd-wrapper'>
                            <ListGroup.Item onClick={this.runCommand.bind(this)} data-value="How old are you?">How old are you?</ListGroup.Item>
                            <ListGroup.Item onClick={this.runCommand.bind(this)} data-value="Nine ... but I’ll be ten on May sixteenth">Nine ... but I’ll be ten on May sixteenth</ListGroup.Item>
                            <ListGroup.Item onClick={this.runCommand.bind(this)} data-value="I’m older than you! I’ll be ten on May fourteenth">I’m older than you! I’ll be ten on May fourteenth</ListGroup.Item>
                            <ListGroup.Item onClick={this.runCommand.bind(this)} data-value="Are you going to have a birthday party?">Are you going to have a birthday party?</ListGroup.Item>
                            <ListGroup.Item onClick={this.runCommand.bind(this)} data-value="Maybe. I’ll have to ask my mother.">Maybe. I’ll have to ask my mother.</ListGroup.Item>

                            <ListGroup.Item onClick={this.runCommand.bind(this)} data-value="Excuse me, is this seat taken?">Excuse me, is this seat taken?</ListGroup.Item>
                            <ListGroup.Item onClick={this.runCommand.bind(this)} data-value="No. it isn’t.">No. it isn’t.</ListGroup.Item>
                            <ListGroup.Item onClick={this.runCommand.bind(this)} data-value="Would you mind moving over one, so my friend and I can sit together?">Would you mind moving over one, so my friend and I can sit together?</ListGroup.Item>
                            <ListGroup.Item onClick={this.runCommand.bind(this)} data-value="No, not at all.">No, not at all.</ListGroup.Item>
                            <ListGroup.Item onClick={this.runCommand.bind(this)} data-value="Thanks a lot.">Thanks a lot.</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Row>
        );
    }
}

export default withRouter(SignLanguage);