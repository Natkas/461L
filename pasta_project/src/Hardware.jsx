
import React, { useState, useEffect } from 'react';
import './App.css';

export const Hardware = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name1, setName1] = useState('');
  const [available1, setAvailable1] = useState(0);
  const [capacity1, setCapacity1] = useState(0);
  const [name2, setName2] = useState('');
  const [available2, setAvailable2] = useState(0);
  const [capacity2, setCapacity2] = useState(0);
  const [inputValue1, setInputValue1] = useState(''); // State for input value of item 1
  const [inputValue2, setInputValue2] = useState(''); // State for input value of item 2
  const [inputCheckOutValue1, setInputCheckOutValue1] = useState(''); // State for checking out item 1
  const [inputCheckOutValue2, setInputCheckOutValue2] = useState(''); // State for checking out item 2


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
  const updateDatabase = (itemNumber, amount) => {
    // Make a POST request to your server to update the database
    fetch('http://localhost:3000/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemNumber, // Specify which item to update (1 or 2)
        amount, // Amount to add to available and capacity
      }),
    })
      .then((response) => response.json())
      .then((updatedData) => {
        // Update your component state with the response from the server if needed
        console.log('Database updated successfully', updatedData);
      })
      .catch((error) => {
        console.error('Error updating the database', error);
      });
  };

  // Event handler for updating available and capacity for item 1
  const handleCheckIn1 = () => {
    const amount = parseInt(inputValue1, 10);
    if (!isNaN(amount)) {
      setAvailable1(available1 + amount);
      setInputValue1(''); // Clear the input field
      updateDatabase('b', amount); // Update the database with item 1 and the amount
    }
  };

  const handleCheckOut1 = () => {
    const amount = parseInt(inputCheckOutValue1, 10);
    if (!isNaN(amount) && available1 >= amount) {
      setAvailable1(available1 - amount);
      setInputCheckOutValue1(''); // Clear the input field
      updateDatabase('b', -amount); // Use a negative amount to indicate a checkout
    }
  };


  // Event handler for updating available and capacity for item 2
  const handleCheckIn2 = () => {
    const amount = parseInt(inputValue2, 10);
    if (!isNaN(amount)) {
      setAvailable2(available2 + amount);
      setInputValue2(''); // Clear the input field
      updateDatabase('c', amount); // Update the database with item 2 and the amount
    }
  };

  
  const handleCheckOut2 = () => {
    const amount = parseInt(inputCheckOutValue2, 10);
    if (!isNaN(amount) && available2 >= amount) {
      setAvailable2(available2 - amount);
      setInputCheckOutValue2(''); // Clear the input field
      updateDatabase('c', -amount); // Use a negative amount to indicate a checkout
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem('token');
    window.location.href = "./login-user";
  }

  return (
    <><div className="row">
      <h2>Hardware Management</h2>
      <div className="column">
        <h2>{name1}</h2>
        <label>Capacity: {capacity1}</label>
        <label>Available: {available1}</label>
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
        <h2>{name2}</h2>
        <label>Capacity: {capacity2}</label>
        <label>Available: {available2}</label>
        <input
          type="text"
          placeholder="Enter amount to check in"
          value={inputValue2}
          onChange={(e) => setInputValue2(e.target.value)} />
        <button type="button" onClick={handleCheckIn2}>
          Check In
        </button>
        <input
          type="text"
          placeholder="Enter amount to check out"
          value={inputCheckOutValue2}
          onChange={(e) => setInputCheckOutValue2(e.target.value)} />
        <button type="button" onClick={handleCheckOut2}>
          Check Out
        </button>
      </div>
    </div>
    <div className="row">
        <button type="button" onClick={handleLogOut}>
          Log Out
        </button>
      </div></>
        
  );
};
