import React, { useEffect, useState } from 'react'
//import { useLocation } from 'react-router-dom';
import axios from 'axios';

function ClientSide() {
  const [user , setUser] = useState("");

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