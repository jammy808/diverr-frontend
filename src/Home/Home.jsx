import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CCarousel , CCarouselItem , CImage , CDropdown , CDropdownToggle , CDropdownMenu , CDropdownItem , CDropdownDivider } from '@coreui/react'
import './Home.css'
import '@coreui/coreui/dist/css/coreui.min.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { motion } from 'framer-motion'
import img1 from './img1.png'
import img2 from './img2.png'
import img3 from './img3.png'
import img4 from './img4.png'

function Home() {
  const [user , setUser] = useState("");
  const navigate = useNavigate();
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const images = [
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_delivery_web_tile/v1/attachments/delivery/asset/892bad84259a1c9c66d4c30ef3505e29-1726594972/IMG_6455.jpeg',
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_delivery_web_tile/attachments/delivery/asset/fd054a05d3ab7b53642b11bff7d21d50-1728840987/gillian_v2.jpg',
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_delivery_web_tile/v1/attachments/delivery/asset/7f052b86a8228d0b60db4e9939db3355-1726576362/giant%20in%20desert_delivery.png',
    'https://picsum.photos/500/700',
    'https://picsum.photos/500/650',
    'https://picsum.photos/350/250',
    'https://picsum.photos/450/350',
    'https://picsum.photos/550/400',
    'https://picsum.photos/500/500',
    'https://picsum.photos/500/450',
    
  ];
  
  const getRandomDirection = () => {
    const directions = ['x', '-x', 'y', '-y'];
    const random = Math.floor(Math.random() * directions.length);
    return directions[random];
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/profile`, {
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
    <div className="home-box">

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
              ( <Link to="/profile/freelancer/view/requests"className='explore'><AccountCircleIcon fontSize='large'/></Link> ) }
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

    <div className='home-content'>
      <div className='carousel-container'>
        <CCarousel controls indicators>
          <CCarouselItem>
            <CImage className="image" src={img2} alt="slide 1" />
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="image" src={img1} alt="slide 2" />
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="image" src={'https://chainstack.com/wp-content/uploads/2023/09/Solana-transaction-1024x576.jpg'} alt="slide 3" />
          </CCarouselItem>
        </CCarousel>
      </div>
      
      <img style={{width:'100%'}} src={img3}></img>

      <h1 style={{fontSize:'3.1em' , fontWeight:'450' , marginLeft:'5%' , marginBottom:'1%' , marginTop:'2%'}}>Made With Diverr</h1>

      <div className="image-grid">
      {images.map((src, index) => {
        const direction = getRandomDirection();
        const animation = direction.includes('x')
          ? { x: direction === 'x' ? 100 : -100, opacity: 0 }
          : { y: direction === 'y' ? 100 : -100, opacity: 0 };

        return (
          <motion.div
            key={index}
            className="image-container"
            initial={animation}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <img style={{borderRadius:'10px'}} src={src} alt={`img-${index}`} />
          </motion.div>
        );
      })}
    </div>

      <img style={{width:'100%' , marginTop:'10%'}} src={img4}></img>
    </div>
      
    </div>
  )
}

export default Home