import React, { useState } from 'react';
import './Projects.css';

function Projects() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [projectID, setProjectID] = useState('');

  //This one handles creating a new project (writing in the projects database)
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
    fetch('http://localhost:3000/projects', {
      method: 'POST',
      crossDomain: true,
      headers: 
        {
           'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
        },
      body: JSON.stringify({
      
        token: window.localStorage.getItem('token'),
      })
    }).then((res) => res.json())
    .then((data) => {
      console.log(data, 'projectCreate');
    });
  }
  //This one handles checking if the project exists
  const handleSubmitCheck = (e) => {
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
        <h2>Access An Existing Project</h2>
        <form className = 'existing-project-form'  onSubmit = {handleSubmitCheck}>
          <label>ProjectID</label>
          <input value={projectID} onChange={(e) => setProjectID(e.target.value)} name='projectID' id='projectID' placeholder='ProjectID'/>
          <button type = 'Submit'>Access Project</button>
        </form>
      </div>
    </div>
  );
}

export default Projects;



