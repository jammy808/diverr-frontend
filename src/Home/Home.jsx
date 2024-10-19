import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CCarousel , CCarouselItem , CImage } from '@coreui/react'
import './Home.css'
import '@coreui/coreui/dist/css/coreui.min.css'

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
    <h1 className='logo'>Diverr</h1>

    <div className='carousel-container'>
    <CCarousel controls indicators>
      <CCarouselItem>
        <CImage className="image" src={'/src/Home/img1.png'} alt="slide 1" />
      </CCarouselItem>
      <CCarouselItem>
        <CImage className="image" src={'https://coreui.io/react/docs/static/vue-8a74d93fde1a02c247304291cce46797.jpg'} alt="slide 2" />
      </CCarouselItem>
      <CCarouselItem>
        <CImage className="image" src={'https://coreui.io/react/docs/static/angular-2f3764e2ec8b0b47ebe68f2f80260ef1.jpg'} alt="slide 3" />
      </CCarouselItem>
    </CCarousel>
    </div>

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