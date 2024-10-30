import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FreelancerSide.css'

function FreelancerSide() {
  const [user , setUser] = useState("");
  const navigate = useNavigate();
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

  const handleChat = (gigId , senderId , senderModel) => {
    navigate('/chat', { state: { gigId , senderId , senderModel } });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="main-freelancer-ongoing-gig-container">
      <div className="freelancer-ongoing-gig-container">
      <h1 className="freelancer-ongoing-gig-header">Ongoing Gigs</h1>

      {user.gigs?.length > 0 ? (
        <ul>
          {user.gigs
            .filter((gig) => gig.status === "Ongoing")
            .map((gig) => (
                <li key={gig._id} className="freelancer-ongoing-gig-card">
                <h3 className="freelancer-ongoing-gig-title">{gig.title}</h3>
                <button 
                  className='client-pay-button'
                  onClick={() => handleChat(gig._id , user._id , 'Freelancer')}
                >
                  Chat
                  </button>

                </li>
            ))}
        </ul>
      ) : (
        <p className="freelancer-ongoing-gig-no-gigs">You have no ongoing gigs</p>
      )}
      </div>
    </div>
  )
}

export default FreelancerSide