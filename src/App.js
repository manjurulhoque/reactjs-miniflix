import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Nav from './components/Nav';
import BaseRouter from './routes';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Nav />
                    <BaseRouter />
                </div>
            </Router>
        );
    }
}

export default App;
