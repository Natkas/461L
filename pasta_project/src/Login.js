import React from "react"


const Login = () => {
  return (
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Arima:wght@200&display=swap" rel="stylesheet"></link>
    </head>
    <body>
      <div className = 'loginMenu'>

        <h1>Welcome, please log in to your account!</h1>

        <div className = 'usernameLogin'> 
          <label> Username: </label>
          <input type = 'text' placeholder = 'Enter username' />
        </div>

        <div className = 'passwordLogin'>
          <label> Password: </label>
          <input type = 'text' placeholder = 'Enter password' />
        </div>

        <div className = 'buttons'>
          <button className = 'loginButton' type = 'submit'> Login </button>
          <button className = 'newUserButton' onClick = {navigateToNewUser}> New User </button>
        </div>
        
        <Routes>
          <Route path="NewUserPage" element={<NewUserPage />} />
        </Routes>

      </div>
    </body>
  </html>
  );
};


export default Login;