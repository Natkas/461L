
import React, { useState, useEffect } from 'react';
import './App.css';

export const Hardware = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [name1, setName1] = useState('');
  const [available1, setAvailable1] = useState(0);
  const [capacity1, setCapacity1]= useState(0);
  const [name2, setName2] = useState('');
  const [available2, setAvailable2] = useState(0);
  const [capacity2, setCapacity2]= useState(0);
  

 
  useEffect(() => {
    fetch('http://localhost:3000/hardware')
      .then(response => response.json())
      .then(hardwareData => {
        setData(hardwareData);
        setLoading(false);
        setName1(hardwareData.data[0].name)
        setAvailable1(hardwareData.data[0].available)
        setCapacity1(hardwareData.data[0].capacity)
        setName2(hardwareData.data[1].name)
        setAvailable2(hardwareData.data[1].available)
        setCapacity2(hardwareData.data[1].capacity)
        // console.log(hardwareData.data[0].capacity)
      })
      .catch(error => console.error(error));
  }, []);


 
  
  
  return (
    <div class="row">
  <h2>Hardware Management</h2>
  <div class="column">
    <h2>{name1}</h2>
    <label>Capacity: {capacity1}</label>
    <label>Available: {available1}</label>
    <input type="text" placeholder="Enter amount to check in" />
    <button type="button">Check In</button>
  </div>
  <div class="column">
    <h2>{name2}</h2>
    <label>Capacity: {capacity2}</label>
    <label>Available: {available2}</label>
    <input type="text" placeholder="Enter amount to check in" />
    <button type="button">Check In</button>
  </div>
</div>

  );
  

  // return (
  //   <div className="row">
  //     <h2>Hardware Management</h2>
  //     {loading ? (
  //       <p>Loading hardware...</p>
  //     ) : data.length > 0 ? (
  //       data.map(hardwareSet => (
  //         <div className="column" key={hardwareSet._id}>
  //           <h2>{hardwareSet.name}</h2>
  //           <label>Capacity: {hardwareSet.capacity}</label>
  //           <label>Available: {hardwareSet.available}</label>
  //         </div>
  //       ))
  //     ) : (
  //       <p>No hardware data available.</p>
  //     )}
  //   </div>
  // );
};
