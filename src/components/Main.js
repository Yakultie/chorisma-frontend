import logo from '../logo.png';
import text_logo from '../text_logo.png';
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
                <button className="clicker">
                    <img src={logo} className="App-logo" alt="logo" />
                </button>
                <br /><br />
                <a href="/wizard"><button className="wizard-button">Manual Detect</button></a>
                </header>
            </div>
        );
    }
}

export default Main;
