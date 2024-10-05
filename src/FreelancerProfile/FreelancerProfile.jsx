import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function FreelancerProfile() {

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
      <h1>Freelancer : {user.username}</h1>
      <div><Link to="/view/requests">View Invites</Link></div>
      <div><Link to="/view/applications">View Applications</Link></div>
      <div><Link to="/gigs/freelancer-side">Ongoing Gigs</Link></div>
    </>
  )
}

export default FreelancerProfile