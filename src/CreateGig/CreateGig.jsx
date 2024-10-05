import React, { useState } from 'react';
import axios from 'axios';

const CreateGig = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');
    setIsSubmitting(true);

    const validationErrors = {};
    if (!title.trim()) validationErrors.title = 'Title is required.';
    if (!description.trim()) validationErrors.description = 'Description is required.';
    if (!budget || isNaN(budget) || Number(budget) <= 0) validationErrors.budget = 'Budget must be a positive number.';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const gigData = {
      title: title.trim(),
      description: description.trim(),
      budget: Number(budget),
    };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      };
      const response = await axios.post('http://localhost:8000/gig', gigData, config);

      setSuccessMessage('Gig created successfully!');
      setTitle('');
      setDescription('');
      setBudget('');

    } catch (error) {
      console.error('Error creating gig:', error);
      // Handle errors returned from the backend
      if (error.response && error.response.data) {
        // If backend sends validation errors
        setErrors(error.response.data.errors || { general: error.response.data.message });
      } else {
        setErrors({ general: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-gig-form-container">
      <h2>Create a New Gig</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errors.general && <div className="error-message">{errors.general}</div>}
      <form onSubmit={handleSubmit} className="create-gig-form">
        {/* Title Field */}
        <div className="form-group">
          <label htmlFor="title">Title<span style={{color: 'red'}}>*</span></label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={errors.title ? 'input-error' : ''}
            placeholder="Enter gig title"
          />
          {errors.title && <small className="error-text">{errors.title}</small>}
        </div>

        {/* Description Field */}
        <div className="form-group">
          <label htmlFor="description">Description<span style={{color: 'red'}}>*</span></label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={errors.description ? 'input-error' : ''}
            placeholder="Enter gig description"
            rows="5"
          ></textarea>
          {errors.description && <small className="error-text">{errors.description}</small>}
        </div>

        {/* Budget Field */}
        <div className="form-group">
          <label htmlFor="budget">Budget ($)<span style={{color: 'red'}}>*</span></label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className={errors.budget ? 'input-error' : ''}
            placeholder="Enter budget amount"
            min="0"
            step="0.01"
          />
          {errors.budget && <small className="error-text">{errors.budget}</small>}
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Gig...' : 'Create Gig'}
        </button>
      </form>

      {/* Styles (to remove later) */}
      <style jsx>{`
        .create-gig-form-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .create-gig-form h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .form-group input.input-error,
        .form-group textarea.input-error {
          border-color: red;
        }

        .error-text {
          color: red;
          font-size: 0.875em;
        }

        .success-message {
          background-color: #d4edda;
          color: #155724;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
        }

        .error-message {
          background-color: #f8d7da;
          color: #721c24;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
        }

        button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1em;
          cursor: pointer;
        }

        button:disabled {
          background-color: #6c757d;
          cursor: not-allowed;
        }

        @media (max-width: 600px) {
          .create-gig-form-container {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default CreateGig;
