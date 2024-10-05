import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {

  const [user , setUser] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <div><Link to="/createGig">Create new gig</Link></div>
      <div><Link to="/view/invites">View Invites</Link></div>
      <div><Link to="/view/applicants">View Applicants</Link></div>
      <div><Link to="/gigs/client-side">Ongoing Gigs</Link></div>
    </>
  )
}

export default Profile