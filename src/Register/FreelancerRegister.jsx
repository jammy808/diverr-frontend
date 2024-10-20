import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FreelancerRegister.css';

function FreelancerRegister() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [publicKey , setPublicKey] = useState('');
  const navigate = useNavigate();
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Prepare form data
    const formData = { username, email, password , publicKey};

    try {
      // Make POST request to the server
      const response = await fetch(`${SERVER_URL}/register/freelancer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify(formData), // Convert form data to JSON string
        credentials: 'include'
      });

      if (response.ok) {
        // Handle successful response
        console.log('Registered successful');
        // Reset form inputs
        setUsername('');
        setEmail('');
        setPassword('');
        navigate('/');
      } else {
        // Handle error response
        console.error('Error Registering:', response.statusText);
      }
    } catch (error) {
      console.error('Error Registering:', error);
    }
  };

  return (
    <div className='freelancer-register-wrapper-4'>

      <div className="gif-container-4">
        <img className='gif-4' src="/src/Register/Register_Images/freelancer_register.gif" alt="" />
      </div>

      <div className='freelancer-register-form-container-4'>
        <h2 className='freelancer-register-title-text-4'>Freelancer Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group-4'>
            
            <input
              type="text"
              id="username"
              placeholder='Enter Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className='freelancer-register-input '
            />
          </div>
          <div >
            <input
              type="text"
              id="username"
              placeholder='Enter Email-Id'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='freelancer-register-input '

            />
          </div>

          <div>
            <input
              type="text"
              id="username"
              placeholder='Enter Public Key'
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              required
              className='freelancer-register-input '
            />
          </div>

          <div >
            <input
              type="password"
              id="password"
              placeholder='Set your Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='freelancer-register-input '

            />
          </div>
          <button type="submit" className='freelancer-register-button'>
            Sign Up
          </button>
        </form>
        <div className='link'>
          <Link to="/login/freelancer">Have an account? Sign in here</Link>
        </div>
      </div>
    </div>
  )
}

export default FreelancerRegister