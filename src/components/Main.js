import logo from '../logo.png';
import text_logo from '../text_logo.png';
import Recognizer from './Recognizer';
import '../App.css';
import $ from 'jquery';
import React, { Component } from 'react';

class Main extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                <img src={text_logo} className="Text-logo" alt="text_logo" width="400px" />
                <br /><br /><br />
                <Recognizer />
                <br /><br />
                </header>
            </div>
        );
    }
}

export default Main;
