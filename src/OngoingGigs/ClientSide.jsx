import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ClientSide() {
  const [user , setUser] = useState("");
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get/client', {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (err) {
      console.log(err.response ? err.response.data.message : 'Failed to fetch profile');
    }
  };

  const handleNavigate = (toKey) => {
    navigate('/pay', { state: { toKey } });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Ongoing Gigs</h1>

      {user.gigs?.length > 0 ? (
        <ul>
          {user.gigs
            .filter((gig) => gig.status === "Ongoing")
            .map((gig) => (
                <li key={gig._id}>
                <h3>{gig.title}</h3>
                <button onClick={() => handleNavigate(gig.workingFreelancer.publicKey)}>Pay</button>
                </li>
            ))}
        </ul>
      ) : (
        <p>You have no ongoing gigs</p>
      )}
    </div>
  )
}

export default ClientSide