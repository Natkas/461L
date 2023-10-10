// import React from 'react';
// import './App.css';
// import Navbar from './components/Navbar';
// import { BrowserRouter as Router, Routes, Route }
//     from 'react-router-dom';
// import Login from 'Login'



// function App() {
//     return (
//         <Router>
//             <Navbar />
//             <Routes>
//                 {/* <Route exact path='/' element={<Login />} /> */}
//                 <Route path='/home' element={<Home />} />
//                 {/* <Route path='/about' element={<About />} />
//                 <Route path='/contact' element={<Contact />} />
//                 <Route path='/blogs' element={<Blogs />} />
//                 <Route path='/sign-up' element={<SignUp />} /> */}
//             </Routes>
//         </Router>
//     );
// }
 
// export default App;

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
      <div class = 'App'>
        {
          currentForm == "login"? <Login onFormSwitch = {toggleForm}/> : <Register onFormSwitch = {toggleForm}/> //check if state is login, if no go to register
        }
      </div>
    );
}
 
export default App;