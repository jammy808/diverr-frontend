import React, { useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment';
import './ViewApplications.css'

function ViewApplications() {
    const [user , setUser] = useState("");
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    const fetchProfile = async () => {
        try {
          const response = await axios.get(`${SERVER_URL}/get/freelancer`, {
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
    <div className="main-freelancer-application-container">
      <div className="freelancer-application-container">
      <h3 className="freelancer-application-header">Applied Gigs</h3>
      {user.applied && user.applied.length > 0 ? (
        <ul>
          {user.applied.map((gig) => (
            <li key={gig._id} className="freelancer-application-card">
              <h4 className="freelancer-application-gig-title">{gig.title}</h4>
              <p className="freelancer-application-gig-description">{gig.description}</p>
              <p>Budget: ${gig.budget}</p>
              <p>Client: {gig.client.username}</p>
              <p>Applied Freelancers: {gig.appliedFreelancers.length}</p>
              <p>Invited Freelancers: {gig.invitedFreelancers.length}</p>
              <p>Created: {moment(gig.createdAt).fromNow()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="freelancer-application-no-gigs">No applied gigs.</p>
      )}
      </div>
    </div>
  )
}

export default ViewApplications