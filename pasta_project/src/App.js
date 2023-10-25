import './App.css';
import { Login } from './Login.jsx';
import { Register } from './Register.jsx';
import Projects from './Projects';
import React, {useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  const [currentForm, setCurrentForm] = useState('login');

  //function for mking button work
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

    return (
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Projects" element ={<Projects />} />
      </Routes>
    </Router>
    );
}
 
export default App;