import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BrowseFreelancer() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchFreelancers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get/freelancers'); 
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
    <div>
      <h2>Freelancer List</h2>
      {freelancers.length > 0 ? (
        <ul>
          {freelancers.map((freelancer) => (
            <li key={freelancer._id}>
              <h3>{freelancer.username}</h3>
              <p>email: {freelancer.email}</p>
              <button onClick={() => handleNavigate(freelancer._id)}>View</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No freelancers found.</p>
      )}
    </div>
  );
}

export default BrowseFreelancer;
