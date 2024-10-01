import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
    <h1>Welcome to Diverr</h1>
    <Link to="/login/client">Client Login</Link>
    <br />
    <br />
    <Link to="/login/freelancer">Freelancer Login</Link>
    </>
  )
}

export default Home