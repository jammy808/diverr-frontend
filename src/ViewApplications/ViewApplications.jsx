import React, { useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment';

function ViewApplications() {
    const [user , setUser] = useState("");

    const fetchProfile = async () => {
        try {
          const response = await axios.get('http://localhost:8000/get/freelancer', {
            withCredentials: true,
          });
          setUser(response.data);
        } catch (err) {
          console.log(err.response ? err.response.data.message : 'Failed to fetch profile');
        }
      };

    useEffect(() => {
        fetchProfile();
    }, []);

  return (
    <div>
      <h3>Applied Gigs</h3>
      {user.applied && user.applied.length > 0 ? (
        <ul>
          {user.applied.map((gig) => (
            <li key={gig._id}>
              <h4>{gig.title}</h4>
              <p>{gig.description}</p>
              <p>Budget: ${gig.budget}</p>
              <p>Client: {gig.client.username}</p>
              <p>Applied Freelancers: {gig.appliedFreelancers.length}</p>
              <p>Invited Freelancers: {gig.invitedFreelancers.length}</p>
              <p>Created: {moment(gig.createdAt).fromNow()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No applied gigs.</p>
      )}
    </div>
  )
}

export default ViewApplications