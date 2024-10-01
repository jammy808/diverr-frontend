import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ClientRegister() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Prepare form data
    const formData = { username, email ,password };

    try {
      // Make POST request to the server
      const response = await fetch('http://localhost:8000/register/client', {
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
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Client Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '4px' }}>Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '4px' }}>Email</label>
          <input
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '4px' }}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Login
        </button>
      </form>
      <div style={{ marginTop: '12px' }}>
        <Link to="/login/client">Have an account? Sign in here</Link>
      </div>
    </div>
  )
}

export default ClientRegister