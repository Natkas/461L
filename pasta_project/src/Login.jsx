import React, {useState} from 'react';

//props is how parents send functions to chilren 
export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }

  return (
    <div className='auth-form-container' >
      <h2>Login</h2>
      
      <form className='login-form' onSubmit = {handleSubmit}>
        <label for = 'email'> Email</label>
        <input value = {email} onChange={(e) => setEmail(e.target.value)} type='youremail@gmail.com ' placeholder='Email' id='email' name='email' />
        <label for = 'password'> Password</label>
        <input value = {pass} onChange={(e) => setEmail(e.target.value)} type='youremail@gmail.com ' placeholder='Password' id='password' name='password'/>
        <button type = 'Submit'>Log In</button>
      </form>
      <button onClick={() => props.onFormSwitch('register')}>You can register here</button>
    </div>
  )
}