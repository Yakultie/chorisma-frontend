import './App.css';
import Main from './components/Main';
import NoteVoicingWizard from './components/NoteVoicingWizard';
import $ from 'jquery';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/wizard-page' element={<NoteVoicingWizard />} />
        <Route path="/wizard" element={ <Navigate to="/wizard-page" /> }/>
      </Routes>
    </Router>
  );
}

$(document).on('click', '.clicker', function() {
  $('.App-logo').toggleClass('paused');
  console.log("triggered");
});

export default App;
