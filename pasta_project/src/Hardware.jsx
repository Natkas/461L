
import React, { useState, useEffect } from 'react';
import './App.css';
import './Hardware.css';


export const Hardware = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name1, setName1] = useState('');
  const [available1, setAvailable1] = useState(0);
  const [capacity1, setCapacity1] = useState(0);
  const [name2, setName2] = useState('');
  const [available2, setAvailable2] = useState(0);
  const [capacity2, setCapacity2] = useState(0);
  const [inputValue1, setInputValue1] = useState(''); 
  const [inputValue2, setInputValue2] = useState(''); 
  const [inputCheckOutValue1, setInputCheckOutValue1] = useState('');
  const [inputCheckOutValue2, setInputCheckOutValue2] = useState(''); 
  const projectID = new URLSearchParams(window.location.search).get('projectID');


  useEffect(() => {
    fetch('http://localhost:3000/hardware')
      .then((response) => response.json())
      .then((hardwareData) => {
        setData(hardwareData.data);
        setLoading(false);
        setName1(hardwareData.data[0].name);
        setAvailable1(hardwareData.data[0].available);
        setCapacity1(hardwareData.data[0].capacity);
        setName2(hardwareData.data[1].name);
        setAvailable2(hardwareData.data[1].available);
        setCapacity2(hardwareData.data[1].capacity);
      })
      .catch((error) => console.error(error));
  }, []);

  // Function to update the database
  const updateDatabase = (itemNumber, amount, projectID) => {
  
    fetch('http://localhost:3000/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemNumber, 
        amount, 
        projectID,
      }),
    })
      .then((response) => response.json())
      .then((updatedData) => {
       
        console.log('Database updated successfully', updatedData);
        console.log('Database updated successfully', projectID);
      })
      .catch((error) => {
        console.error('Error updating the database', error);
      });
  };


  const handleCheckIn1 = () => {
    const amount = parseInt(inputValue1, 10);
    if (!isNaN(amount)&& amount+available1 <= capacity1) {
      setAvailable1(available1 + amount);
      setInputValue1(''); 
      updateDatabase('b', amount,projectID); 
    }
    if (isNaN(amount)) {
      alert('Please enter a number');
    }
    if (amount+available1 > capacity1) {
      alert('You do not have enough space to check in');
    }
  };

  const handleCheckOut1 = () => {
    const amount = parseInt(inputCheckOutValue1, 10);
    if (!isNaN(amount) && available1 >= amount) {
      setAvailable1(available1 - amount);
      setInputCheckOutValue1(''); 
      updateDatabase('b', -amount,projectID); 
    }
    if (isNaN(amount)) {
      alert('Please enter a number');
    }
    if (available1 < amount) {
      alert('You do not have enough items to check out');
    }
    
  };


  
  const handleCheckIn2 = () => {
    const amount = parseInt(inputValue2, 10);
    if (!isNaN(amount) && amount+available2 <= capacity2) {
      setAvailable2(available2 + amount);
      setInputValue2(''); 
      updateDatabase('c', amount,projectID); 
    }
    if (isNaN(amount)) {
      alert('Please enter a number');
    }
    if (amount+available2 > capacity2) {
      alert('You do not have enough space to check in');
    }
  };

  
  const handleCheckOut2 = () => {
    const amount = parseInt(inputCheckOutValue2, 10);
    if (!isNaN(amount) && available2 >= amount) {
      setAvailable2(available2 - amount);
      setInputCheckOutValue2(''); // Clear the input field
      updateDatabase('c', -amount,projectID); // Use a negative amount to indicate a checkout

    }
    if (isNaN(amount)) {
      alert('Please enter a number');
    }
    if (available2 < amount) {
      alert('You do not have enough items to check out');
    }
  };

  const handleLogOut = () => {
    console.log("Log out button clicked");
    window.localStorage.removeItem('token');
    window.history.replaceState({}, document.title, '/login-user');
    window.location.reload();
  }


  return (
    <div className="row">
      <h2 className='header'>Hardware Management of project: {projectID}</h2>
      <div className="column">
        <h3 className='small-header'>{name1}</h3>
        <label className='label'>Capacity: {capacity1}</label>
        <label className='label'>Available: {available1}</label>
        <input
          type="text"
          placeholder="Enter amount to check in"
          value={inputValue1}
          onChange={(e) => setInputValue1(e.target.value)} />
        <button type="button" onClick={handleCheckIn1}>
          Check In
        </button>
        <input
          type="text"
          placeholder="Enter amount to check out"
          value={inputCheckOutValue1}
          onChange={(e) => setInputCheckOutValue1(e.target.value)} />
        <button type="button" onClick={handleCheckOut1}>
          Check Out
        </button>
      </div>
      <div className="column">
        <h3 className='small-header'>{name2}</h3>
        <label className='label'>Capacity: {capacity2}</label>
        <label className='label'>Available: {available2}</label>
        <input className='input-check-in'
          type="text"
          placeholder="Enter amount to check in"
          value={inputValue2}
          onChange={(e) => setInputValue2(e.target.value)} />
        <button type="button" onClick={handleCheckIn2}>
          Check In
        </button>
        <input className="input-check-out"
          type="text"
          placeholder="Enter amount to check out"
          value={inputCheckOutValue2}
          onChange={(e) => setInputCheckOutValue2(e.target.value)} />
        <button type="button" onClick={handleCheckOut2}>
          Check Out
        </button>
      </div>
      <div className="row">
        <button type="button" className="log-out-button" onClick={handleLogOut}>
          Log Out
        </button>
        <button type="button" className="log-out-button" onClick={() => window.location.href=(`./project-overview?projectID=${projectID}`)}>
          Go to your project overview
        </button>
      </div>
    </div>
  );
};