import React, { useState, useEffect } from 'react';
import './Projects.css';

function Overview() {
  const [Hardwareset1, setHardwareset1] = useState(0);
  const [Hardwareset2, setHardwareset2] = useState(0);
  const projectID = new URLSearchParams(window.location.search).get('projectID');



  useEffect(() => {
    fetch(`http://localhost:3000/project-overview?projectID=${projectID}`, {
      method: 'GET',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        
        setHardwareset1(data.data.HW1)
        setHardwareset2(data.data.HW2);

        console.log(data.data.HW1, 'project overview data');
      })
      .catch((error) => {
        console.error(error);
      });
  }, [projectID]);
 
  const handleLogOut = () => {
    console.log("Log out button clicked");
    window.localStorage.removeItem('token');
    window.history.replaceState({}, document.title, '/login-user');
    window.location.reload();
  };

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
