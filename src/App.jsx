import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import FreelancerLogin from './Login/FreelancerLogin';
import FreelancerRegister from './Register/FreelancerLogin';
import ClientLogin from './Login/ClientLogin';
import ClientRegister from './Register/ClientRegister';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Freelancer's Routes */}
        <Route path="/login/freelancer" element={<FreelancerLogin />} />
        <Route path="/register/freelancer" element={<FreelancerRegister />} />

        {/* Client's Routes */}
        <Route path="/login/client" element={<ClientLogin />} />
        <Route path="/register/client" element={<ClientRegister />} />
        
      </Routes>
    </Router>

  );
}

export default App;
