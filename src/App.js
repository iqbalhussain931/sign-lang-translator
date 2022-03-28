import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Header from './components/Header';
import Home from './components/Home';
import SignLanguage from './components/SignLanguage';
import { 
  Container
} from 'react-bootstrap';

import { coursesData } from './data/data';
import { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {


  state = {
    userInput: "",
    messages: [],
    translatorTyping: false
  }

  render() {
    return (
      <Container className="App">
        <Header />
        <Router>
            <Switch>
              <Route path="/start">
                <SignLanguage state={this.state} />
              </Route>
              <Route path="/">
                  <Home state={this.state} />
              </Route>
            </Switch>
        </Router>
      </Container>
    )
  };
}

export default App;
