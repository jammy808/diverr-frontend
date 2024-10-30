import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ClientSide.css';


function ClientSide() {
  const [user , setUser] = useState("");
  const navigate = useNavigate();
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/get/client`, {
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

  const handleChat = (gigId , senderId , senderModel) => {
    navigate('/chat', { state: { gigId , senderId , senderModel } });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className='main-client-container'>
      <div className='client-gigs-container'>
      <h1 className='client-header'>Ongoing Gig</h1>

      {user.gigs?.length > 0 ? (
        <ul className='client-gigs-list'>
          {user.gigs
            .filter((gig) => gig.status === "Ongoing")
            .map((gig) => (
                <li key={gig._id} className='client-gig-card'>
                <h3 className='client-gig-title'>{gig.title}</h3>
                <button 
                  className='client-pay-button'
                  onClick={() => handleChat(gig._id , user._id , 'Client')}
                >
                  Chat
                  </button>

                  <button 
                  className='client-pay-button'
                  onClick={() => handleNavigate(gig.workingFreelancer.publicKey)}
                >
                  Pay
                  </button>

                </li>
            ))}
        </ul>
      ) : (
        <p className='client-no-gigs'>You have no ongoing gigs</p>
      )}
      </div>
    </div>
    
  )
}

export default ClientSide