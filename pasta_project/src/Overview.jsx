import React, { useState, useEffect } from 'react';
import './Projects.css';



function Overview() {
  const [projectID, setProjectID] = useState('');
  const [Hardwareset1, setHardwareset1] = useState('');
  const [Hardwareset2, setHardwareset2] = useState('');

  useEffect(() => {
    // Fetch hardware sets when component mounts
    fetchHardwareSets();
  }, [projectID]); // Adding projectID as a dependency to re-fetch when it changes

  const fetchHardwareSets = () => {
    // Fetch hardware sets based on projectID
    fetch(`http://localhost:3000/project-overview`, {
      method: 'GET',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'projectOverview');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const handleLogOut = () => {
    console.log("Log out button clicked");
    window.localStorage.removeItem('token');
    window.history.replaceState({}, document.title, '/login-user');
    window.location.reload();
  }

  return (
    <div className='row'>
      <div className ='column'>
        <h2>Project {projectID} Overview</h2>
        <p>Hardware Set 1: {Hardwareset1}</p>
        <p>Hardware Set 2: {Hardwareset2}</p>
      </div>
      <div className="row">
        <button type="button" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Overview;



