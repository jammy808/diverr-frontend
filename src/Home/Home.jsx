import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
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
    <h1>Welcome to Diverr</h1>
    <Link to="/login/client">Client Login</Link>
    <br />
    <br />
    <Link to="/login/freelancer">Freelancer Login</Link>

    {user ?
      (
        <div> 
          {user.type === "Client" ? ( <Link to="/profile/client">Profile Client</Link> ) : ( <Link to="/profile/freelancer">Profile Freelancer</Link> ) }
        </div>
      ) : 
      (<h1>Sign in</h1>)}

        <div> 
          {user.type === "Client" ? ( <Link to="/browse/freelancers">Browse freelancers</Link> ) : ( <Link to="/browse/gigs">Browse Gigs</Link> ) }
        </div>
      
    </>
  )
}

export default Home