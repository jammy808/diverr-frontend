import React, { useEffect, useState } from 'react'
import { Link, useNavigate , Outlet , NavLink} from 'react-router-dom';
import axios from 'axios';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';

function FreelancerProfile() {

  const [user , setUser] = useState("");
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false); // Close drawer after navigation on mobile
    }
  };

  const item = {
    py: 1,
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
      bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
  };

  const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
  };

  const drawer = (
    <List disablePadding> 

      <ListItem disablePadding>
        <ListItemButton
          component={NavLink}
          to="/profile/freelancer/view/requests"
          sx={item}
          style={({ isActive }) => ({
            backgroundColor: isActive ? 'rgb(125 163 249)' : '',
            color: isActive ? 'black' : 'white',
          })}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="View Invites" />
        </ListItemButton>
      </ListItem>

      <Divider sx={{ backgroundColor: 'white' , height:'2px' , marginTop: "10px" , marginBottom: "10px"}} />

      <ListItem disablePadding>
        <ListItemButton
          component={NavLink}
          to="/profile/freelancer/view/applications"
          sx={item}
          style={({ isActive }) => ({
            backgroundColor: isActive ? 'rgb(125 163 249)' : '',
            color: isActive ? 'black' : 'white',
          })}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Applications" />
        </ListItemButton>
      </ListItem>

      <Divider sx={{ backgroundColor: 'white' , height:'2px' , marginTop: "10px" , marginBottom: "10px"}} />

      <ListItem disablePadding>
        <ListItemButton
          component={NavLink}
          to="/profile/freelancer/gigs/freelancer-side"
          sx={item}
          style={({ isActive }) => ({
            backgroundColor: isActive ? 'rgb(125 163 249)' : '',
            color: isActive ? 'black' : 'white',
          })}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Ongoing Gigs" />
        </ListItemButton>
      </ListItem>

    </List>
  );


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

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8000/logout', { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
    <CssBaseline />
    <IconButton
          color="black"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
    </IconButton>

    <h1 className='logo'>Diverr</h1>

    <div style={{width:'0px' , position:'relative' , left:'83%'}}>
    <Button
      onClick={handleLogout}
      sx={{ borderRadius: '8px', textTransform: 'none',
        '&:hover': {
          color: 'red',
        },
        fontSize:'1.1em'
      }}
    >
      <LogoutIcon  sx={{color:'black' , fontSize:'2.5em' ,'&:hover': {color:'red'}}}/>
    </Button>
    </div>

    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, 
      }}
      sx={{
        width: 85,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          height:'85%',
          boxSizing: 'border-box',
          backgroundColor: '#3e16b0',
          padding: '18px',
          marginTop:'70px',
          marginLeft: '13px',
          borderRadius: '20px'
        
        },
      }}
    >
      {drawer}
    </Drawer>

    <main style={{ flexGrow: 1, padding: '72px 20px 20px 20px' }}>
      <Outlet />
    </main>
    </div>

  )
}
{/* <h1>Freelancer : {user.username}</h1>
<div><Link to="/view/requests">View Invites</Link></div>
<div><Link to="/view/applications">View Applications</Link></div>
<div><Link to="/gigs/freelancer-side">Ongoing Gigs</Link></div> */}

export default FreelancerProfile