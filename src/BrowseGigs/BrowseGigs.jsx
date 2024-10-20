import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link, useNavigate } from 'react-router-dom';
import './BrowseGigs.css';
import { CDropdown , CDropdownToggle , CDropdownMenu , CDropdownItem , CDropdownDivider } from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const BrowseGigs = () => {
  const [gigs, setGigs] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const handleNavigate = (gig) => {
    navigate('/view/gig', { state: { gig } });
  };

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/browse/gigs`);
        console.log(response.data);
        setGigs(response.data);
      } catch (error) {
        console.error('Error fetching gigs', error);
      }
    };

    fetchGigs();
  }, []);

  return (
    <div className="outer-freelancer-container">

      <nav className="navbar">
        <div className="navbar-logo">
          <h1 className='home-logo'>Diverr<span style={{color:'#4864ff' , fontSize:'1em'}}>.</span></h1>
        </div>

        <div className="navbar-login">

          <CDropdown dark>
            <CDropdownToggle color="blue" size='lg'>Diverr Pro</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem href="#">Action</CDropdownItem>
              <CDropdownItem href="#">Another action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          <div style={{paddingTop:'9px' , marginRight:'1em' , marginLeft:'1em'}}>
            {user.type === "Client" ? 
            ( <Link to="/browse/freelancers" className="explore">Browse freelancers</Link> ) : 
            ( <Link to="/browse/gigs" className="explore">Browse Gigs</Link> ) }
          </div>

          {user ?
          (
            <div style={{paddingTop:'9px' , marginRight:'1em' , marginLeft:'1em'}}> 
              {user.type === "Client" ? 
              ( <Link to="/profile/client/createGig" className='explore'><AccountCircleIcon fontSize='large'/></Link> ) : 
              ( <Link to="/profile/freelancer"className='explore'><AccountCircleIcon fontSize='large'/></Link> ) }
            </div>
          ) : 
          (<CDropdown dark>
            <CDropdownToggle color="blue" size='lg'>Login</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem href="/login/client"> Client </CDropdownItem>
              <CDropdownItem href="/login/freelancer"> Freelancer </CDropdownItem>
            </CDropdownMenu>
          </CDropdown> 
          )}

          
        </div>
      </nav>

    <div className="freelancer-browse-gigs-container">
      <div className='freelancer-browse-gigs-content' >
      <h1 className="freelancer-browse-gigs-header">All Gigs</h1>
      {gigs.length === 0 ? (
        <p className="freelancer-browse-gigs-no-gigs">No gigs available at the moment.</p>
      ) : (
        gigs
          .filter((gig) => gig.status === "Open")
          .map((gig) => (
            <div key={gig._id} className="freelancer-browse-gigs-card">
              <h2 className="freelancer-browse-gigs-title">{gig.title}</h2>
              <p className="freelancer-browse-gigs-description">{gig.description}</p>
              <p className="freelancer-browse-gigs-budget">Budget: ${gig.budget}</p>
              <p className="freelancer-browse-gigs-client">Client: {gig.client.username}</p>
              <p className="freelancer-browse-gigs-applied-freelancers">
                Applied Freelancers: {gig.appliedFreelancers.length}
              </p>
              <p className="freelancer-browse-gigs-invited-freelancers">
                Invited Freelancers: {gig.invitedFreelancers.length}
              </p>
              <p className="freelancer-browse-gigs-created">
                Created: {moment(gig.createdAt).fromNow()}
              </p>
              <button className="freelancer-browse-gigs-button" onClick={() => handleNavigate(gig)}>
                View Gig
              </button>
            </div>
            
          ))
      )}
    </div>
    </div>
    </div>
  );
};

export default BrowseGigs;
