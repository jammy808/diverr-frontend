import React, { useEffect, useState } from 'react';
import {Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ViewFreelancer.css';
import profileImage from './freelancer-profile-img.jpeg';
import { CDropdown , CDropdownToggle , CDropdownMenu , CDropdownItem , CDropdownDivider } from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ViewFreelancer() {
  const location = useLocation();
  const { id } = location.state || {};
  const [user, setUser] = useState("");
  const [freelancer, setFreelancer] = useState("");

  const skills = [
    'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 
    'Node.js', 'Express.js', 'RESTful APIs', 'GraphQL', 'Python', 'Django', 
    'Flask', 'Ruby on Rails', 'PHP', 'Laravel', 'SQL', 'MySQL', 'PostgreSQL', 
    'MongoDB', 'NoSQL', 'Docker', 'Kubernetes', 'Git', 'GitHub', 'CI/CD', 
    'AWS', 'Azure', 'Google Cloud', 'Linux', 'Agile', 'Scrum'
  ];

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

  const fetchFreelancer = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
  
      const response = await axios.get(`http://localhost:8000/getFreelancer/${id}`, config);
      setFreelancer(response.data);
    } catch (error) {
      console.error('Error fetching freelancer data:', error);
    }
  };

  const handleInvite = async (gigId) => {
    const data = {
      gigId: gigId,
      freelancerId: freelancer._id, // Ensure 'freelancer' is defined in your component
    };
  
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // This enables sending cookies with the request
      };
      
      // Sending POST request to the invite endpoint
      const response = await axios.post('http://localhost:8000/invite', data, config);
      
      fetchFreelancer();
      console.log('Invite sent:', response.data);
    } catch (err) {
      console.error('Error sending invite:', err);
      // You might want to add error handling here, such as displaying an error message to the user
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchFreelancer();
  }, []);

  return (
    <div style={{ backgroundColor: '#3e50e4', height: '100vh'}}>
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

      <div className="freelancer-container">
      <div className="freelancer-details">
        <h1>Freelancer Details</h1>
        <div className='freelancer-details-container'>
          <div className='image'>
            <img src={profileImage} alt="Profile" />
          </div>
          <div className='details'>
            <p><strong>Name:</strong> {freelancer.username}</p>
            <p>
              "Passionate about crafting seamless web experiences from both the client 
              and server sides. As a fullstack developer with 6 years of experience, 
              I thrive in building robust, scalable, and high-performance web applications.
              I am proficient in working across the entire development lifecycle—from 
              conceptualization and planning to deployment and ongoing maintenance."
            </p>
            <h2>Skills</h2>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <span key={index} className="skill-item">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="invite-section">
        <h2>Send an Invite</h2>

        {user.gigs?.length > 0 ? (
          <ul className="gig-list">
            {user.gigs.map((gig) => (
              <li key={gig._id} className="gig-item">
                <div className="gig-info">
                  <h3>{gig.title}</h3>
                </div>
                {freelancer.invites?.includes(gig._id) ? (
                  <p className="invited-tag">Invited</p>
                ) : (
                  <button className="invite-button" onClick={() => handleInvite(gig._id)}>
                    Invite
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-gigs">You have no gigs</p>
        )}
      </div>
      </div>
    </div>
  );
}

export default ViewFreelancer;
