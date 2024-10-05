import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function ViewFreelancer() {
  const location = useLocation();
  const { id } = location.state || {};
  const [user , setUser] = useState("");
  const [freelancer , setFreelancer] = useState("");

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get/client', {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (err) {
      console.log(err.response ? err.response.data.message : 'Failed to fetch profile');
    }
  };

  const fetchFreelancer = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
  
      const response = await axios.get(`http://localhost:8000/getFreelancer/${id}`, config);
      setFreelancer(response.data);
    } catch (error) {
      console.error('Error fetching freelancer data:', error);
    }
  };

  const handleInvite = async (gigId) => {
    const data = {
      gigId: gigId,
      freelancerId: freelancer._id, // Ensure 'freelancer' is defined in your component
    };
  
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // This enables sending cookies with the request
      };
      
      // Sending POST request to the invite endpoint
      const response = await axios.post('http://localhost:8000/invite', data, config);
      
      fetchFreelancer();
      console.log('Invite sent:', response.data);
    } catch (err) {
      console.error('Error sending invite:', err);
      // You might want to add error handling here, such as displaying an error message to the user
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchFreelancer();
  }, []);

  return (
    <div>
      <h1>Freelancer Details</h1>
      <p>Name: {freelancer.username}</p>
      <p>Email: {freelancer.email}</p>

      <h1>Send a Invite</h1>

      {user.gigs?.length > 0 ? (
        <ul>
          {user.gigs.map((gig) => (
            <li key={gig._id}>
              <h3>{gig.title}</h3>
              {freelancer.invites.includes(gig._id) ? ( <p>Invited</p>) : ( <button onClick={() => handleInvite(gig._id)}>Invite</button>)}
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no gigs</p>
      )}
    </div>
  )
}

export default ViewFreelancer