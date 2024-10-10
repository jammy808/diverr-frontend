import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FreelancerLogin.css';

function FreelancerLogin() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Prepare form data
    const formData = { username, password };

    try {
      // Make POST request to the server
      const response = await fetch('http://localhost:8000/login/freelancer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify(formData), // Convert form data to JSON string
        credentials: 'include'
      });

      if (response.ok) {
        // Handle successful response
        console.log('Login successful');
        // Reset form inputs
        setUsername('');
        setPassword('');
        navigate('/');
      } else {
        // Handle error response
        console.error('Error logging in:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='wrapper-2'>

      <div className='gif-container-2'>
        <img className='gif' src="/src/Login/Login_images/freelancer_login.gif" alt="" />
      </div>

      <div className='form-container-2'>
        <h2 className='title-text-2'>Freelancer Login</h2>


        <form onSubmit={handleSubmit}>
          <div className="form-group-2">
            <label htmlFor="username" className="label"></label>
            <input
              type="text"
              id="username"
              placeholder='Enter Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="label"></label>
            <input
              type="password"
              id="password"
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>

          <button type="submit" className="button">
            Login
          </button>

        </form>

        <div className="link">
          <Link to="/register/freelancer">Don't have an account? <br></br>Sign up here</Link>
        </div>
      </div>
      

    </div>
  )
}

export default FreelancerLogin