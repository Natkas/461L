// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// async function fetchHardwareData() {
//   try {
//     const response = await axios.get('http://localhost:3000/hardware'); 
//     const hardwareData = response.data.data;
    
//     return hardwareData;
//   } catch (error) {
//     console.error('Error fetching hardware data:', error);
//   }
// }

// function Hardware() {
//   const [hardwareData, setHardwareData] = useState([]);

//   useEffect(() => {
//     fetchHardwareData().then((data) => setHardwareData(data)); 
//   }, []);

  
//   return (
//     <div className='row'>
//       {hardwareData.map((hardwareSet) => (
//         <div className='column' key={hardwareSet._id}>
//           <h2>{hardwareSet.name}</h2>
//           <label>Capacity: {hardwareSet.capacity}</label>
//           <label>Available: {hardwareSet.available}</label>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Hardware;



// import React, {useState,useEffect} from 'react';
// import './App.css';

// //props is how parents send functions to chilren 
// export const Hardware = () => {
  
   
//   const [data, setData] = useState([])
  

//   fetch('http://localhost:3000/hardware')
//     .then(Response => Response.json())
//     .then(data => {
//       console.log(data)
//     })
//     .catch(error => {
//       console.log(error)
//     })
      

  
//   return (
//     <div className='row' >
//       <h2>Hardware Management</h2>
      
//         <div className='column' key={data._id}>
//             <h2>{data.name}</h2>
//             <label>Capacity: {data.capacity}</label>
//             <label>Available: {data.available}</label>
            

      
//       </div>
//     </div>
//   )
// }




import React, { useState, useEffect } from 'react';
import './App.css';

export const Hardware = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  

 
  useEffect(() => {
    fetch('http://localhost:3000/hardware')
      .then(response => response.json())
      .then(hardwareData => {
        setData(hardwareData);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  
  data.forEach((hardware) => {
    // Access the properties of each hardware object
    const id = hardware._id; // Access the _id property
    const capacity = hardware.capacity; // Access the capacity property
    const available = hardware.available; // Access the available property
    const name = hardware.name; // Access the name property
  
    // Now you can use these values as needed
    console.log(`ID: ${id}, Capacity: ${capacity}, Available: ${available}, Name: ${name}`);
  });

  console.log(data[0])
  
  
  return (
    <div className="row">
      <h2>Hardware Management</h2>
      {loading ? (
        <p>Loading hardware...</p>
      ) : data.length > 0 ? (
        data.map(hardwareSet => (
          <div className="column" key={hardwareSet._id}>
            <h2>{hardwareSet.name}</h2>
            <label>Capacity: {hardwareSet.capacity}</label>
            <label>Available: {hardwareSet.available}</label>
          </div>
        ))
      ) : (
        <p>No hardware data available.</p>
      )}
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
