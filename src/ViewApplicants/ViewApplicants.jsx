import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewApplicants = () => {
  const [gigs, setGigs] = useState([]);

  const fetchGigs = async () => {
    try {
      const config = {
          withCredentials: true,
      };    
      const response = await axios.get(`http://localhost:8000/get/applicants`, config);
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
    <div>
      <h2>Freelancer Invitation</h2>
      {gigs.length > 0 ? (
        gigs.map((gig) => (
          <div key={gig._id} className="gig">
            <h3>Gig: {gig.title}</h3>
            <p>Description: {gig.description}</p>
            <h4>Applications of Freelancers:</h4>
            <ul>
              {gig.appliedFreelancers.length > 0 ? (
                gig.appliedFreelancers.map((freelancer) => (
                  <li key={freelancer._id}>
                    {freelancer.username} - email: {freelancer.email} -   
                    <button onClick={()=>{handleAcceptApplication(gig._id , freelancer._id)}}>accept</button>
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

export default ViewApplicants;
