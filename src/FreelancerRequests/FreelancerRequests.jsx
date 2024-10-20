import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FreelancerRequests.css'

function FreelancerRequests() {
  const [gigs, setGigs] = useState([]);
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const handleAcceptInvite = async (gigId, freelancerId) => {
    const data = { gigId };
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
  
      const response = await axios.post(`${SERVER_URL}/accept/invite`, data, config );
      
      fetchGigs();
      
      console.log('Response:', response.data.message);
    } catch (error) {
      console.error('Error accepting invite:', error);
    }
  };

  const fetchGigs = async () => {
    try {
      const config = {
          withCredentials: true,
      };    
      const response = await axios.get(`${SERVER_URL}/invites/freelancer`, config);
      setGigs(response.data.gigs);
    } catch (error) {
      console.error('Error fetching gigs:', error);
    }
  };


  useEffect(() => {
    fetchGigs();
  }, []);

  return (
    <div className='main-freelancer-request-container'>
      <div className='freelancer-request-container'>
      <h2 className='freelancer-request-header'>Your Invitations</h2>
      {gigs.length > 0 ? (
        gigs.map((gig) => (
          <div key={gig._id} className="freelancer-request-card">
            <h3 className="freelancer-request-gig-title" >{gig.title}</h3>
            <p className="freelancer-request-gig-description">Description: {gig.description}</p>
            <h4 className="freelancer-request-freelancer-title">Invited By: {gig.client.username}</h4>

            <button 
              className="freelancer-request-cancel-button"
              onClick={()=>{handleAcceptInvite(gig._id)}}
            >
              Accept</button>
          </div>
        ))
      ) : (
        <p className="freelancer-request-no-gigs">No gigs available.</p>
      )}
    </div>
    </div>
  )
}

export default FreelancerRequests