import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ClientRegister.css';

function ClientRegister() {

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
      const response = await fetch(`${SERVER_URL}/register/client`, {
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
    <div className="client-register-wrapper-3 ">
      <div className="client-register-form-container-3">
        <h2 className='client-register-title-text-3 '>Client Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className='client-register-form-group-3'>
            <input
              type="text"
              id="username"
              placeholder='Enter Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className='client-register-input '
            />
          </div>

          <div className='client-register-form-group-3' >
            <input
              type="text"
              id="username"
              placeholder='Enter Email-Id'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='client-register-input '
            />
          </div>

          <div className='client-register-form-group-3'>
            <input
              type="text"
              id="username"
              placeholder='Enter Public Key'
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              required
              className='client-register-input  '
            />
          </div>

          <div className='client-register-form-group-3'>
            <input
              type="password"
              id="password"
              placeholder='Set your Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='client-register-input  '
            />
          </div>
          <button type="submit" className="client-register-button">
            Sign Up
          </button>
        </form>
        <div className="link">
          <Link to="/login/client">Have an account? Sign in here</Link>
        </div>
      </div>

      <div className="gif-container-3">
        <img className='gif-3' src="/src/Register/Register_Images/Client_Register-2.gif" alt="" />
      </div>
    </div>
  )
}

export default ClientRegister