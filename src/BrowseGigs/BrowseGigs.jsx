import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const BrowseGigs = () => {
  const [gigs, setGigs] = useState([]);
  const navigate = useNavigate();

  const handleNavigate = (gig) => {
    navigate('/view/gig', { state: { gig } });
  };

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/browse/gigs'); // Replace with your backend endpointment
        console.log(response.data)
        setGigs(response.data);
      } catch (error) {
        console.error('Error fetching gigs', error);
      }
    };

    fetchGigs();
  }, []);

  return (
    <div>
      <h1>All Gigs</h1>
      {gigs
      .filter((gig) => gig.status === "Open")
      .map((gig) => (
        <div key={gig._id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
          <h2>{gig.title}</h2>
          <p>{gig.description}</p>
          <p>Budget: ${gig.budget}</p>
          <p>Client: {gig.client.username}</p>
          <p>Applied Freelancers: {gig.appliedFreelancers.length}</p>
          <p>Invited Freelancers: {gig.invitedFreelancers.length}</p>
          <p>Created: {moment(gig.createdAt).fromNow()}</p> {/* How many days ago it was created */}
          <button onClick={() => handleNavigate(gig)}>View Gig</button>
        </div>
      ))}
    </div>
  );
};

export default BrowseGigs;
