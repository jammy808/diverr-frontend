import React, { useEffect, useState } from 'react';
import { Link , useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './ViewGig.css';
import { CDropdown , CDropdownToggle , CDropdownMenu , CDropdownItem , CDropdownDivider } from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ViewGig() {
  const location = useLocation();
  const { gig } = location.state || {};
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const skills = ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'HTML', 'CSS', 'REST APIs'];
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}/profile`, {
        withCredentials: true,
      });
      setUser(response.data.user);
    } catch (err) {
      console.error(err.response ? err.response.data.message : 'Failed to fetch profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = async () => {
    const data = {
      gigId: gig._id,
      freelancerId: user._id,
    };

    setIsSubmitting(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const response = await axios.post(`${SERVER_URL}/apply`, data, config);
      fetchProfile();
      console.log('Applied:', response.data);
    } catch (err) {
      console.error('Error applying:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-gig-page"> {/* Apply lavender background only to ViewGig page */}
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
      <div className="container view-gig"> {/* Inner content of ViewGig */}
        <div className="inner-container">
          <h2>{gig.title}</h2>
          <p><span>Client:</span> {gig.client.username}</p>

          {/* Description Box with Gainsboro styling */}
          <div className="description-container">
            <h3>Project Description:</h3>
            <div className="gainsboro-box">
              <p>{gig.description}</p>
            </div>
          </div>

          {/* Created Time */}
          <div className="created-time">
            <p><span>Created:</span> {moment(gig.createdAt).fromNow()}</p>
          </div>

          {/* Skills Section */}
          <div>
            <h3>Required Skills:</h3>
            <ul className="skills-list">
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          {/* Applied and Invited Freelancers */}
          <div className="freelancers-container">
            <p><span>Applied Freelancers:</span> {gig.appliedFreelancers.length}</p>
            <p><span>Invited Freelancers:</span> {gig.invitedFreelancers.length}</p>
          </div>

          {user.gigs?.includes(gig._id.toString()) ? (
            <p className="status accepted">Accepted</p>
          ) : user.applied?.includes(gig._id.toString()) ? (
            <p className="status applied">Applied</p>
          ) : (
            <div className="button-wrapper">
              <button onClick={handleApply} disabled={isSubmitting}>
                {isSubmitting ? 'Applying...' : 'Apply'}
              </button>
            </div>
          )}

          {/* Budget */}
          <div className="budget-container">
            <p className="budget"><span>Budget:</span> ${gig.budget}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewGig;
