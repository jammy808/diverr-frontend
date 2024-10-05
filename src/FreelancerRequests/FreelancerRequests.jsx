import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FreelancerRequests() {
  const [gigs, setGigs] = useState([]);

  const handleAcceptInvite = async (gigId, freelancerId) => {
    const data = { gigId };
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
  
      const response = await axios.post('http://localhost:8000/accept/invite', data, config );
      
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
      const response = await axios.get(`http://localhost:8000/invites/freelancer`, config);
      setGigs(response.data.gigs);
    } catch (error) {
      console.error('Error fetching gigs:', error);
    }
  };


  useEffect(() => {
    fetchGigs();
  }, []);

  return (
    <div>
      <h2>Your Invitations</h2>
      {gigs.length > 0 ? (
        gigs.map((gig) => (
          <div key={gig._id} className="gig">
            <h3>Gig: {gig.title}</h3>
            <p>Description: {gig.description}</p>
            <h4>Invited By: {gig.client.username}</h4>
            <button onClick={()=>{handleAcceptInvite(gig._id)}}>accept</button>
          </div>
        ))
      ) : (
        <p>No gigs available.</p>
      )}
    </div>
  )
}

export default FreelancerRequests