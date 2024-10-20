import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './BrowseFreelancer.css'
import { CDropdown , CDropdownToggle , CDropdownMenu , CDropdownItem , CDropdownDivider } from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function BrowseFreelancer() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const fetchFreelancers = async () => {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    
    try {
      const response = await axios.get(`${SERVER_URL}/get/freelancers`); 
      setFreelancers(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleNavigate = (id) => {
    navigate('/view/freelancer', { state: { id } });
  };

  useEffect(() => {
    fetchFreelancers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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

      <div className="freelancer-browse-freelancers-container">
      <h2 className="freelancer-browse-freelancers-header">Freelancer List</h2>
      {freelancers.length > 0 ? (
        <ul className="freelancer-list">
          {freelancers.map((freelancer) => (
            <li key={freelancer._id} className="freelancer-card">
              <h3 className="freelancer-card-title">{freelancer.username}</h3>
              <p className="freelancer-card-email">email: {freelancer.email}</p>
              <button
                className="freelancer-card-button"
                onClick={() => handleNavigate(freelancer._id)}
                >
                  View
                </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No freelancers found.</p>
      )}
      </div>
    </div>
  );
}

export default BrowseFreelancer;
