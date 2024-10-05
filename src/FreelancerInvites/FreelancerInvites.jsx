import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FreelancerInvites = () => {
  const [gigs, setGigs] = useState([]);

  const handleCancelInvite = async (gigId, freelancerId) => {
    const data = { gigId, freelancerId };
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
  
      const response = await axios.delete('http://localhost:8000/cancel-invite', {
        data, 
        ...config,
      });
      
      fetchGigs();
      
      console.log('Response:', response.data.message);
    } catch (error) {
      console.error('Error removing invite:', error);
    }
  };

  const fetchGigs = async () => {
    try {
      const config = {
          withCredentials: true,
      };    
      const response = await axios.get(`http://localhost:8000/invites/client`, config);
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
      <h2>Freelancer Invitation</h2>
      {gigs.length > 0 ? (
        gigs.map((gig) => (
          <div key={gig._id} className="gig">
            <h3>Gig: {gig.title}</h3>
            <p>Description: {gig.description}</p>
            <h4>Invited Freelancers:</h4>
            <ul>
              {gig.invitedFreelancers.length > 0 ? (
                gig.invitedFreelancers.map((freelancer) => (
                  <li key={freelancer._id}>
                    {freelancer.username} - email: {freelancer.email} -   
                    <button onClick={()=>{handleCancelInvite(gig._id , freelancer._id)}}>cancel</button>
                  </li>
                ))
              ) : (
                <li>No freelancers invited yet.</li>
              )}
            </ul>
          </div>
        ))
      ) : (
        <p>No gigs available.</p>
      )}
    </div>
  );
};

export default FreelancerInvites;
