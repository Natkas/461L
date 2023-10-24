import React, {useState} from 'react';

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
            // 'Access-Control-Allow-Origin': '*',
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
      // Handle success, e.g., redirect the user
    })
    .catch((error) => {
      console.error(error);
      // Handle error, e.g., show an error message to the user
    });
  }

  return (
    <div className='auth-form-container' >
      <h2>Login</h2>
      
      <form className='login-form' onSubmit = {handleSubmit}>
        <label htmlFor = 'email'> Email</label>
        <input value = {email} onChange={(e) => setEmail(e.target.value)} type='youremail@gmail.com ' placeholder='Email' id='email' name='email' />
        <label htmlFor = 'password'> Password</label>
        <input value = {pass} onChange={(e) => setPass(e.target.value)} type='youremail@gmail.com ' placeholder='Password' id='password' name='password'/>
        <button type = 'Submit'>Log In</button>
      </form>
      <button onClick={() => props.onFormSwitch('register')}>You can register here</button>
    </div>
  )
}