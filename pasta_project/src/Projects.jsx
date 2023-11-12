import React, { useState } from 'react';
import './Projects.css';

function Projects() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [projectID, setProjectID] = useState('');


  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:3000/projects', {
  method: 'POST',
  crossDomain: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    
  },
  body: JSON.stringify({
    name: name,
    description: description,
    projectID: projectID,

    token: window.localStorage.getItem('token'),
  }),
}).then((res) => res.json())
.then((data) => {
  console.log(data, 'projectCreate');
  if (data.status === 'Project created') {
    alert('Your project has been created');

    window.localStorage.setItem('token', data.data);

    window.location.href = `./Hardware?projectID=${projectID}`
  } else if (data.error === 'Project already exists') {
    alert('ProjectID already exists');
  }
});
    
  }
  

  const handleSubmitCheck = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/projects-login', {
      method: 'POST',
      crossDomain: true,
      headers: 
        {
           'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
      body: JSON.stringify({
        
        projectID: projectID,

      
        token: window.localStorage.getItem('token'),
      })



    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, 'projectCheck');
      if (data.status === 'Project logged in') {
        alert('Your project exists, you can manage your hardware now');
    
        window.localStorage.setItem('token', data.data);
    
        window.location.href = `./Hardware?projectID=${projectID}`
      } else if (data.error === 'Project not found') {
        alert('ProjectID does not exist');
      }
    });

    
    
  }
  const handleLogOut = () => {
    console.log("Log out button clicked");
    window.localStorage.removeItem('token');
    window.history.replaceState({}, document.title, '/login-user');
    window.location.reload();
  }

  return (
    <div className='row'>
      <div className ='column'>
        <h2>Create A New Project</h2>
        <form className = 'new-project-form'  onSubmit = {handleSubmit}>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} name='name' id='name' placeholder='Name'/>
          <label>Description</label>
          <input value={description} onChange={(e) => setDescription(e.target.value)} name='description' id='description' placeholder='Description'/>
          <label>ProjectID</label>
          <input value={projectID} onChange={(e) => setProjectID(e.target.value)} name='projectID' id='projectID' placeholder='ProjectID'/>
          <button type = 'Submit'>Create Project</button>
        </form>
      </div>
      <div className = 'column'>
        <h2>Use An Existing Project</h2>
        <form className = 'existing-project-form'  onSubmit = {handleSubmitCheck}>
          <label>ProjectID</label>
          <input value={projectID} onChange={(e) => setProjectID(e.target.value)} name='projectID' id='projectID' placeholder='ProjectID'/>
          <button type = 'Submit'>Access Project</button>
        </form>
      </div>
      
      <div className="row">
        <button type="button" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Projects;



