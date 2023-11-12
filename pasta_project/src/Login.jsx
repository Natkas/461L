import React, {useState} from 'react';
import './App.css';

//props is how parents send functions to chilren 
export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    // const {email, pass} = this.state;
    console.log(email, pass);

    fetch('http://localhost:3000/login-user', {
      method: 'POST',
      crossDomain: true,
      headers: 
        {
           'Content-Type': 'application/json',
            'Accept': 'application/json',

        },
      body: JSON.stringify({
        email: email,
        password: pass
      })
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then((data) => {
      console.log(data, 'userLogin');
      
      if(data.status == 'User logged in'){
        alert ('You are logged in');
        console.log('we are after alert but before token')
        window.localStorage.setItem('token', data.data);
        console.log('we are after token')
        window.location.href = "./Projects";
        console.log('we are after redirect')
      }
    })
    .catch((error) => {
      console.error(error);
      alert('Wrong email or password')
    });
  }

  return (
    <div className='auth-form-container'>
      <h2>Login</h2>
      <form className='login-form' onSubmit={handleSubmit}>
        <label htmlFor='email'> Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='text'
          placeholder='Email'
          id='email'
          name='email'
        />
        <label htmlFor='password'> Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type='password' 
          placeholder='Password'
          id='password'
          name='password'
        />
        <button type='submit'>Log In</button>
      </form>
      <button onClick={() => window.location.href=('/register')}>You can register here</button>
    </div>
  );
  
}