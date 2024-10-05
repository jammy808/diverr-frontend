import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

function ViewGig() {
  const location = useLocation();
  const { gig } = location.state || {};
  const [user , setUser] = useState("");

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/profile', {
        withCredentials: true,
      });
      setUser(response.data.user);
    } catch (err) {
      console.log(err.response ? err.response.data.message : 'Failed to fetch profile');
    }
  };

  const handleApply = async () => {
    const data = {
      gigId: gig._id,
      freelancerId: user._id,
    };
  
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      
      const response = await axios.post('http://localhost:8000/apply', data, config);
      
      fetchProfile();
      console.log('applied :', response.data);
    } catch (err) {
      console.error('Error applying:', err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);


  return (
    <>
      <div>
          <h2>{gig.title}</h2>
          <p>{gig.description}</p>
          <p>Budget: ${gig.budget}</p>
          <p>Client: {gig.client.username}</p>
          <p>Applied Freelancers: {gig.appliedFreelancers.length}</p>
          <p>Invited Freelancers: {gig.invitedFreelancers.length}</p>
          <p>Created: {moment(gig.createdAt).fromNow()}</p>
          {user.gigs && user.gigs.includes(gig._id.toString()) ? (
            <p>Accepted</p>
            ) : user.applied && user.applied.includes(gig._id.toString()) ? (
            <p>Applied</p>
            ) : (
            <button onClick={() => handleApply()}>Apply</button>
            )}
      </div>
    </>
  )
}

export default ViewGig