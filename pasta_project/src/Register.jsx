import React, {useState} from 'react';
import './App.css';
import './Register.css';


export const Register = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, pass); 
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: 
        {
           'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
      body: JSON.stringify({
        email: email,
        password: pass,
        name: name
      })
    }).then((res) => res.json())
    .then((data) => {
      console.log(data, 'userRegister');
      if(data.status == 'User registered'){
        alert ('You are registered');
        console.log('we are after alert but before token')
        window.localStorage.setItem('token', data.data);
        console.log('we are after token')
        window.location.href = "./Projects";
        console.log('we are after redirect')
      }
      else{
        alert('There is an error, please review your information')
      }
    })
  }

  return (
    <div className='auth-form-container'>
      <h2>Register</h2>
    
      <form className='register-form' onSubmit = {handleSubmit}>
        <label>Full name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} name='name' id='name' placeholder='Name'/>
        <label htmlFor = 'email'> Email</label>
        <input value = {email} onChange={(e) => setEmail(e.target.value)} type='youremail@gmail.com' placeholder='Email' id='email' name='email' />
        <label htmlFor = 'password'> Password</label>
        <input value = {pass} onChange={(e) => setPass(e.target.value)} type='password' placeholder='Password' id='password' name='password'/>
        <button type = 'Submit'>Log In</button>
      </form>
      <button className='b-link' onClick={() => window.location.href=('/login-user')}>If you already have an account login here</button>
    </div>
  )
}