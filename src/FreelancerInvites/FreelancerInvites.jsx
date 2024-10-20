import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FreelancerInvites.css'; // Ensure that you import the CSS

const FreelancerInvites = () => {
  const [gigs, setGigs] = useState([]);
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const handleCancelInvite = async (gigId, freelancerId) => {
    const data = { gigId, freelancerId };
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
  
      const response = await axios.delete(`${SERVER_URL}/cancel-invite`, {
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
      const response = await axios.get(`${SERVER_URL}/invites/client`, config);
      setGigs(response.data.gigs);
    } catch (error) {
      console.error('Error fetching gigs:', error);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  return (
    <div className='main-freelancer-container'>
    <div className="freelancer-invites-container">
      <h2 className="freelancer-invites-header">Your Invites</h2>
      {gigs.length > 0 ? (
        gigs.map((gig) => (
          <div key={gig._id} className="freelancer-invites-card">
            <h3 className="freelancer-invites-gig-title">Gig: {gig.title}</h3>
            <p className="freelancer-invites-gig-description">Description: {gig.description}</p>
            <h4 className="freelancer-invites-freelancer-title">Invited Freelancers:</h4>
            <ul className="freelancer-invites-freelancer-list">
              {gig.invitedFreelancers.length > 0 ? (
                gig.invitedFreelancers.map((freelancer) => (
                  <li key={freelancer._id} className="freelancer-invites-freelancer-item">
                    {freelancer.username} - email: {freelancer.email}
                    <button
                      className="freelancer-invites-cancel-button"
                      onClick={() => handleCancelInvite(gig._id, freelancer._id)}
                    >
                      Cancel
                    </button>
                  </li>
                ))
              ) : (
                <li className="freelancer-invites-no-freelancer">No freelancers invited yet.</li>
              )}
            </ul>
          </div>
        ))
      ) : (
        <p className="freelancer-invites-no-gigs">No gigs available.</p>
      )}
    </div>
    </div>
  );
};

export default FreelancerInvites;
