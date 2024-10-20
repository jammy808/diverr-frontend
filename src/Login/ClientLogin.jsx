import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ClientLogin.css'; // Import the CSS file

function ClientLogin() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { username, password };
    console.log(SERVER_URL)
    try {
      const response = await fetch(`${SERVER_URL}/login/client`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      if (response.ok) {
        console.log('Login successful');
        setUsername('');
        setPassword('');
        navigate('/');
      } else {
        console.error('Error logging in:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="wrapper">
      <div className="form-container">
        <h2 className="title-text">Client Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="form-group">
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
          <Link to="/register/client">Don't have an account?<br /> Sign up here</Link>
        </div>
      </div>

      <div className="gif-container">
        <img className='gif' src="/src/Login/Login_images/client_login.gif" alt="" />
      </div>
    </div>
  );
}

export default ClientLogin;