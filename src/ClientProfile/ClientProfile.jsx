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
import './ClientProfile.css'

function Profile() {

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
          to="/profile/client/createGig"
          sx={item}
          style={({ isActive }) => ({
            backgroundColor: isActive ? 'rgb(125 163 249)' : '',
            color: isActive ? 'black' : 'white',
          })}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Create Gig" />
        </ListItemButton>
      </ListItem>


      <Divider sx={{ backgroundColor: 'white' , height:'2px' , marginTop: "10px" , marginBottom: "10px"}} />

      <ListItem disablePadding>
        <ListItemButton
          component={NavLink}
          to="/profile/client/view/invites"
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
          to="/profile/client/view/applicants"
          sx={item}
          style={({ isActive }) => ({
            backgroundColor: isActive ? 'rgb(125 163 249)' : '',
            color: isActive ? 'black' : 'white',
          })}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Applicants" />
        </ListItemButton>
      </ListItem>

      <Divider sx={{ backgroundColor: 'white' , height:'2px' , marginTop: "10px" , marginBottom: "10px"}} />

      <ListItem disablePadding>
        <ListItemButton
          component={NavLink}
          to="/profile/client/gigs/client-side"
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

export default Profile