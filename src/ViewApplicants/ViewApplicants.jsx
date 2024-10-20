import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewApplicants.css'

const ViewApplicants = () => {
  const [gigs, setGigs] = useState([]);
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const fetchGigs = async () => {
    try {
      const config = {
          withCredentials: true,
      };    
      const response = await axios.get(`${SERVER_URL}/get/applicants`, config);
      setGigs(response.data.gigs);
    } catch (error) {
      console.error('Error fetching gigs:', error);
    }
  };

  const handleAcceptApplication = async (gigId, freelancerId) => {
    const data = { gigId , freelancerId };
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
  
      const response = await axios.post('http://localhost:8000/accept/application', data, config );
      
      fetchGigs();
      
      console.log('Response:', response.data.message);
    } catch (error) {
      console.error('Error accepting invite:', error);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  return (
    <div className='main-applicants-container'>
      <div className='applicants-container'>
      <h2 className='applicants-header'>Freelancer Invitation</h2>
      {gigs.length > 0 ? (
        gigs.map((gig) => (
          <div key={gig._id} className='applicants-card' >
            <h3 className='applicants-gig-title'>Gig: {gig.title}</h3>
            <p className='applicants-gig-description'>Description: {gig.description}</p>
            <h4 className='applicants-gig-freelancer-title'>Applications of Freelancers:</h4>
            <ul className='applicants-freelancer-list'>
              {gig.appliedFreelancers.length > 0 ? (
                gig.appliedFreelancers.map((freelancer) => (
                  <li key={freelancer._id} className='applicants-freelancer-item'>
                    {freelancer.username} - email: {freelancer.email} -   
                    <button 
                      className='applicants-accept-button'
                      onClick={()=>{handleAcceptApplication(gig._id , freelancer._id)}}
                    >
                        accept
                    </button>
                  </li>
                ))
              ) : (
                <li className='applicants-no-freelancers'>No freelancers invited yet.</li>
              )}
            </ul>
          </div>
        ))
      ) : (
        <p className='.applicants-no-gigs'>No gigs available.</p>
      )}
      </div>
    </div>
  );
};

export default ViewApplicants;
