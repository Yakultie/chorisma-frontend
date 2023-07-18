import logo from '../logo.png';
import '../App.css';
import $ from 'jquery';
import React, { Component } from 'react';

class NoteVoicingWizard extends Component {
    render() {
        return (
            <div className="NoteVoicingWizard">
                <header className="NoteVoicingWizard-header">
                    <button className="record-button">
                        Record
                    </button>
                </header>
            </div>
        );
    }
}

export default NoteVoicingWizard;
