import './App.css';
import { Login } from './Login.jsx';
import { Register } from './Register.jsx';
import React, {useState } from 'react';


function App() {
  const [currentForm, setCurrentForm] = useState('login');

  //function for mking button work
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

    return (
      <div className = 'App'>
        {
          currentForm == "login"? <Login onFormSwitch = {toggleForm}/> : <Register onFormSwitch = {toggleForm}/> //check if state is login, if no go to register
        }
      </div>
    );
}
 
export default App;