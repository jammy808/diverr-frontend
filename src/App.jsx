import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';

import FreelancerLogin from './Login/FreelancerLogin';
import FreelancerRegister from './Register/FreelancerRegister';
import FreelancerProfile from './FreelancerProfile/FreelancerProfile';
import FreelancerRequests from './FreelancerRequests/FreelancerRequests';
import BrowseGigs from './BrowseGigs/BrowseGigs';
import ViewGig from './ViewGig/ViewGig';
import ViewApplications from './ViewApplications/ViewApplications';
import FreelancerSide from './OngoingGigs/FreelancerSide';

import ClientLogin from './Login/ClientLogin';
import ClientRegister from './Register/ClientRegister';
import ClientProfile from './ClientProfile/ClientProfile';
import CreateGig from './CreateGig/CreateGig';
import BrowseFreelancer from './BrowseFreelancer/BrowseFreelancer';
import ViewFreelancer from './ViewFreelancer/ViewFreelancer';
import FreelancerInvites from './FreelancerInvites/FreelancerInvites';
import ViewApplicants from './ViewApplicants/ViewApplicants';
import ClientSide from './OngoingGigs/ClientSide';
import Pay from './Pay/Pay';
import Chat from './Chat/Chat';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Freelancer's Routes */}
        <Route path="/login/freelancer" element={<FreelancerLogin />} />
        <Route path="/register/freelancer" element={<FreelancerRegister />} />

        <Route path="/profile/freelancer" element={<FreelancerProfile />} >
          <Route path="view/requests" element={<FreelancerRequests />} />
          <Route path="view/applications" element={<ViewApplications />} />
          <Route path="gigs/freelancer-side" element={<FreelancerSide />} />
        </Route>

        <Route path="/browse/gigs" element={<BrowseGigs />} />
        <Route path="/view/gig" element={<ViewGig />} />
        
    

        {/* Client's Routes */}
        <Route path="/login/client" element={<ClientLogin />} />
        <Route path="/register/client" element={<ClientRegister />} />

        <Route path="/profile/client" element={<ClientProfile />} >
          <Route path="createGig" element={<CreateGig />} />
          <Route path="view/invites" element={<FreelancerInvites />} />
          <Route path="view/applicants" element={<ViewApplicants />} />
          <Route path="gigs/client-side" element={<ClientSide />} />
        </Route>
        
        <Route path="/browse/freelancers" element={<BrowseFreelancer />} />
        <Route path="/view/freelancer" element={<ViewFreelancer />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/chat" element={<Chat />} />
    
      </Routes>
    </Router>

  );
}

export default App;
