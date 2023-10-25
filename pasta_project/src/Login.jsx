import React, { useState } from 'react';

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const db = await fetch('/get_database', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await fetch('/get_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: email, password: pass }),
    });

    const user = await response.json();

    if (user && user.password === pass) {
      console.log('Login Successful');
      // Go to user page

    } else {
      console.log('Invalid email or password');
      // Password incorrect
    }
  };

  return (
    <div className='auth-form-container' >
      <h2>Login</h2>
      
      <form className='login-form' onSubmit={handleSubmit}>
        <label htmlFor='email'> Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' id='email' name='email' />
        <label htmlFor='password'> Password</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)} type='password' placeholder='Password' id='password' name='password' />
        <button type='submit'>Log In</button>
      </form>
      <button onClick={() => props.onFormSwitch('register')}>You can register here</button>
    </div>
  );
};
