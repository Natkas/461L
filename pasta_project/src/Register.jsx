import React, { useState } from 'react';

export const Register = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch call to Flask server to check if the user exists
    const response = await fetch('/get_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: email }),
    });

    const user = await response.json();

    if (!user) {
      const addUserResponse = await fetch('/add_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password: pass }),
      });

      const addedUser = await addUserResponse.json();
      console.log(addedUser.message);
      // Added User
    } else {
      console.log('User already exists');
      // Already exists
    }
  };

  return (
    <div className='auth-form-container'>
      <h2>Register</h2>
    
      <form className='register-form' onSubmit={handleSubmit}>
        <label>Full name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} name='name' id='name' placeholder='Name' />
        <label htmlFor='email'> Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' id='email' name='email' />
        <label htmlFor='password'> Password</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)} type='password' placeholder='Password' id='password' name='password' />
        <button type='submit'>Register</button>
      </form>
      <button className='b-link' onClick={() => props.onFormSwitch('login')}>If you already have an account login here</button>
    </div>
  );
};
