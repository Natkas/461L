import React, {useState} from 'react';


export const Register = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const {name, email, pass} = this.state;
  //   console.log(name, email, pass);

  //   fetch('http://localhost:3000/register', {
  //     method: 'POST',
  //     crossDomain: true,
  //     headers: 
  //       {
  //          'Content-Type': 'application/json',
  //           'Accept': 'application/json',
  //           'Access-Control-Allow-Origin': '*',
  //       },
  //     body: JSON.stringify({
  //       email: email,
  //       password: pass,
  //       name: name
  //     })
  //   }).then((res) => res.json())
  //   .then((data) => {
  //     console.log(data, 'userRegister');
  //   });
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, pass); // Access state directly, no need for this.state

    fetch('http://localhost:3000/register', {
      method: 'POST',
      crossDomain: true,
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
    });
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
      <button className='b-link' onClick={() => props.onFormSwitch('login')}>If you already have an account login here</button>
    </div>
  )
}