import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import axios from 'axios';
import './CreateGig.css'; 

const allSkills = [
  // Technical Skills
  "JavaScript", "React", "Node.js", "Python", "CSS", "HTML", "SQL", "TypeScript", "Java", "PHP", 
  "Ruby", "C++", "Swift", "Kotlin", "Rust", "Go", "Django", "MongoDB", "AWS", "Docker", "Git", 
  "Angular", "Vue.js", "Bootstrap", "WordPress", "JQuery", "Figma", "Photoshop", "Illustrator", 
  "Flutter", "C#", "Objective-C", "SASS", "Jasmine", "Express.js", "Vue.js", "Android", "iOS", 
  "Bootstrap", "GitHub", "WebRTC", "SEO", "Firebase", "Laravel", "Spring Boot", "GraphQL", "ASP.NET", 
  "Redux", "jQuery", "Electron", "TensorFlow", "Machine Learning", "Deep Learning", "Data Science", 
  "Data Visualization", "CI/CD", "Blockchain", "Solidity", "Ethereum", "Kubernetes", "PostgreSQL", 
  "MySQL", "SQLite", "NoSQL", "GitLab", "Bitbucket", "Jira", "Slack", "Trello", "Asana", "Scrum", 
  "Agile", "Vuex", "Ember.js", "Gulp", "Webpack", "Parcel", "Nginx", "Apache", "Magento", "Shopify", 
  "React Native", "Laravel", "Next.js", "Nest.js", "Ruby on Rails", "Elixir", "Rust", "Scala", 
  "Figma", "UI/UX", "Adobe XD", "Axure", "InVision", "Python Flask", "FastAPI", "Django REST Framework", 
  "OpenCV", "Pandas", "Numpy", "Scikit-learn", "Jupyter", "Pytorch", "Matplotlib", "Tableau", "Power BI", 
  "SQL Server", "Oracle", "MongoDB", "Redis", "Apache Kafka", "Hadoop", "Spark", "Apache Hive", "ETL", 
  "Machine Learning", "Artificial Intelligence", "Natural Language Processing", "Data Mining", "Deep Learning", 
  "AI Research", "Network Security", "Penetration Testing", "Ethical Hacking", "Cybersecurity", "DevOps", 
  "Cloud Computing", "AWS Lambda", "Azure", "GCP", "Terraform", "Chef", "Ansible", "Jenkins", "Docker Compose", 
  "Vagrant", "Virtualization", "Kubernetes", "OpenStack", "CloudFormation", "OAuth", "JWT", "GraphQL", 
  "REST API", "WebSocket", "OAuth2", "API Design", "Security Best Practices", "Cross-browser Testing", 
  "Mobile Testing", "Agile Testing", "Automation Testing", "Selenium", "Appium", "Cypress", "Postman", 
  "Jest", "Mocha", "Chai", "Jasmine", "Test-Driven Development", "Behavior-Driven Development", 
  "QA", "Quality Assurance", "Continuous Integration", "Continuous Deployment", "GitOps", "Distributed Systems", 
  "System Architecture", "Microservices", "Serverless", "Monolithic", "SOA", "API Gateway", "Edge Computing", 
  "Quantum Computing", "Blockchain Development", "Crypto", "NFT", "Web3", "Smart Contracts", "Decentralized Applications", 
  "Metaverse", "Unreal Engine", "Unity", "Game Development", "3D Modeling", "Blender", "Maya", "Cinema 4D", 
  "Animation", "3D Design", "Augmented Reality", "Virtual Reality", "ARKit", "ARCore", "HoloLens", "Google Cardboard",
  
  // Soft Skills
  "Leadership", "Communication", "Teamwork", "Problem-Solving", "Adaptability", "Critical Thinking", 
  "Emotional Intelligence", "Negotiation", "Time Management", "Project Management", "Collaboration", 
  "Creativity", "Conflict Resolution", "Active Listening", "Stress Management", "Decision Making", "Motivation",
  "Public Speaking", "Presentation Skills", "Networking", "Persuasion", "Self-Motivation", "Interpersonal Skills",
  "Patience", "Positive Attitude", "Resilience", "Self-Discipline", "Coaching", "Mentorship", "Feedback", 
  "Delegation", "Task Management", "Goal Setting", "Organizational Skills", "Detail-Oriented", "Flexibility",
  "Work Ethic", "Initiative", "Empathy", "Diplomacy", "Crisis Management", "Emotional Regulation", "Negotiation",
  "Collaboration", "Influence", "Team Building", "Cultural Sensitivity", "Cross-Cultural Communication",
  "Adaptability to Change", "Professionalism", "Conflict Mediation", "Self-Awareness", "Self-Improvement",

  // Business & Management Skills
  "Strategic Planning", "Business Analysis", "Product Management", "Operations Management", "Business Development", 
  "Marketing", "Brand Strategy", "SEO", "Content Marketing", "Digital Marketing", "Social Media Marketing", 
  "PPC Advertising", "Email Marketing", "Market Research", "Customer Relationship Management (CRM)", 
  "Sales", "Account Management", "Customer Success", "Negotiation", "Supply Chain Management", "Risk Management", 
  "Financial Analysis", "Budgeting", "Forecasting", "Accounting", "Financial Reporting", "Project Budgeting", 
  "Data Analysis", "Business Intelligence", "Supply Chain Optimization", "Vendor Management", "Contract Negotiation", 
  "Change Management", "Product Launches", "Product Roadmaps", "E-commerce", "Retail Management", 
  "Inventory Management", "Operations Optimization", "Process Improvement", "Leadership Development", 
  "Entrepreneurship", "Venture Capital", "Investor Relations", "Crowdfunding", "Cost Reduction Strategies", 
  "Business Strategy", "Sales Forecasting", "Brand Management", "Customer Experience", "Client Relationship", 
  "Franchise Management", "Risk Mitigation", "Operational Efficiency", "Agile Project Management", 
  "Business Operations", "Resource Allocation", "Performance Metrics", "Digital Transformation", 
  "Workforce Planning", "Mergers & Acquisitions", "Corporate Governance", "Legal Compliance", 
  "International Business", "Corporate Social Responsibility (CSR)", "Negotiation Skills", "Cross-functional Leadership",

  // Marketing & Creativity
  "Creative Direction", "Graphic Design", "Brand Development", "Product Design", "Web Design", "Photography", 
  "Illustration", "Animation", "3D Animation", "Typography", "Video Production", "Video Editing", "Post-Production", 
  "Storyboarding", "UI/UX Design", "User Experience Research", "User Interface Prototyping", "Motion Graphics", 
  "Marketing Strategy", "Advertising", "Campaign Management", "Copywriting", "Content Creation", "SEO Strategy", 
  "Email Campaigns", "Influencer Marketing", "Event Planning", "Market Analysis", "Competitive Analysis", 
  "Public Relations", "Crisis Communications", "Media Relations", "Sponsorships", "Public Speaking", "Digital Strategy", 
  "Mobile Marketing", "Interactive Media", "Blogging", "Podcasting", "Affiliate Marketing", "Conversion Rate Optimization", 
  "Customer Insights", "Audience Engagement", "Social Media Management", "Community Management", 
  "E-commerce Marketing", "Product Photography", "Content Curation", "Content Marketing Strategy", 
  "Brand Storytelling", "Event Marketing", "Mobile App Marketing", "Social Media Advertising", 
  "Paid Media", "User-Generated Content", "Google Analytics", "A/B Testing", "Sales Funnel Optimization", 
  "Traffic Generation", "Content Management Systems (CMS)", "Product Photography", "B2B Marketing", "B2C Marketing",
  
  // Industry-Specific Skills
  "Healthcare Management", "Medical Billing", "Medical Coding", "Pharmaceutical Sales", "Nursing", "Surgery", 
  "Medical Research", "Biotechnology", "Healthcare Compliance", "Patient Care", "Clinical Trials", "Epidemiology", 
  "Psychology", "Pharmacy", "Mental Health Counseling", "Physical Therapy", "Healthcare Data Analysis", 
  "Biomedical Engineering", "Telemedicine", "Dental Care", "Medical Technology", "Healthcare IT", "Health Economics", 
  "Public Health", "Genetic Research", "Neuroscience", "Geriatrics", "Pediatrics", "Cardiology", "Orthopedics", 
  "Radiology", "Anesthesia", "Emergency Medicine", "Emergency Response", "Veterinary Medicine", "Nutrition", 
  "Health Coaching", "Sports Medicine", "Occupational Therapy", "Health Insurance", "Healthcare Policy",

  "Teaching", "Tutoring", "Lesson Planning", "Classroom Management", "Special Education", "Curriculum Development", 
  "Education Technology", "Student Counseling", "Educational Leadership", "Classroom Facilitation", 
  "Early Childhood Education", "Language Teaching", "ESL", "STEM Education", "Literacy Development", 
  "Pedagogy", "Teacher Training", "Homeschooling", "Distance Learning", "Behavioral Management", 
  "Academic Research", "Educational Psychology", "Instructional Design", "Learning Assessments", "Study Skills", 
  "Assessment Development", "Digital Literacy", "Student Engagement", "Learning Disabilities", "Adult Education",
  
  // Languages
  "English", "Spanish", "French", "German", "Chinese", "Japanese", "Korean", "Arabic", "Russian", 
  "Portuguese", "Italian", "Dutch", "Hindi", "Bengali", "Punjabi", "Urdu", "Turkish", "Swahili", 
  "Thai", "Vietnamese", "Polish", "Greek", "Czech", "Romanian", "Hebrew", "Hungarian", "Swedish", 
  "Finnish", "Danish", "Norwegian", "Hebrew", "Filipino", "Malay", "Indonesian", "Serbo-Croatian", "Tamil", 
  "Telugu", "Gujarati", "Marathi", "Nepali", "Urdu", "Burmese", "Sinhala", "Lithuanian", "Latvian", "Estonian",
  
  // Miscellaneous
  "Photography", "Travel Planning", "Cooking", "DIY Crafting", "Sports Coaching", "Personal Finance", 
  "Public Speaking", "Event Planning", "Hiking", "Camping", "Leadership", "Volunteering", "Philanthropy",
  "Charity Work", "Blogging", "Podcasting", "Social Media Strategy", "Yoga", "Fitness Coaching", "Personal Training",
  "Coaching", "Mentoring", "Life Coaching", "Self-Improvement", "Meditation", "Time Management",
  "Mindfulness", "Sustainability", "Environmental Awareness", "Self-Care", "Humanitarian Work"
];

const CreateGig = () => {
  const [title, setTitle] = useState('');
  // const [type, setType] = useState('Full-Time');
  const[deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [experince, setExperince] = useState('');
  const [skills, setSkills] = useState([]);
  const [inputValue, setInputValue] = useState('');  // Input field value for skills
  const [dropdownVisible, setDropdownVisible] = useState(false); // Control visibility of dropdown 
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  

   // Function to handle search and filtering
   const handleSearch = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.length > 0) {
      setDropdownVisible(true); // Show dropdown when user starts typing
    } else {
      setDropdownVisible(false); // Hide dropdown when input is empty
    }
  };

  // Function to handle selecting a skill
  const handleSkillSelect = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]); // Add skill to selected array
      setInputValue('');  // Clear input after selecting a skill
      setDropdownVisible(false);  // Close dropdown after selecting
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove)); // Remove skill from selected list
  };

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
      skills: skills,
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
      setSkills([]);

    } catch (error) {
      console.error('Error creating gig:', error);
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors || { general: error.response.data.message });
      } else {
        setErrors({ general: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='body-bg'>
      <div className='container-form'>
        <div className='form-wrapper'>
          {successMessage && <div className="success-message">{successMessage}</div>}
          {errors.general && <div className="error-message">{errors.general}</div>}

          <form onSubmit={handleSubmit} className='form'>
            <h2 className='form-heading'>Create a New Gig</h2>

            <div className="form-group">
              <label htmlFor="type" className="form-label">Title</label>
              <input
                id="title"
                name="title"
                type='text'
                className={`form-input ${errors.title ? 'input-error' : ''}`} // Use backticks ``
                required
                placeholder="e.g. 'Build a Responsive E-commerce Website'"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              >
                
              </input>

              {errors.title && <small className="error-text">{errors.title}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="type" className="form-label">Budget</label>
              <input
                id="budget"
                name="budget"
                type='text'
                className={`form-input ${errors.description ? 'input-error' : ''}`}
                required
                placeholder="e.g. $1000 for the entire project"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                
              </input>
              {errors.budget && <small className="error-text">{errors.budget}</small>}
            </div>


            <div className="form-group">
              <label htmlFor="type" className="form-label">Project Deadline</label>
              <input
                type="text"
                id="deadline"
                name="deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className={`form-input ${errors.deadline ? 'input-error' : ''}`} 
                required
                placeholder="e.g. 3 months "
                
              ></input>
              {errors.deadline && <small className="error-text">{errors.deadline}</small>}
            </div>


            <div  className="form-group">
              <label htmlFor="type" className="form-label">Experience</label>
              <input
                type="text"
                id="experince"
                name="experince"
                className={`form-input ${errors.experince ? 'input-error' : ''}`}
                placeholder="e.g. 3+ years in web development"
                required
                value={experince}
                onChange={(e) => setExperince(e.target.value)}
              />
              {errors.experince && <small className="error-text">{errors.experince}</small>}
            </div>

            <div className="form-group full-width">
              <label htmlFor="skills" className="form-label">Skills Required</label>
              <div className="skills-input-wrapper">
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={inputValue}
                  placeholder="Search skills..."
                  className={`form-input ${errors.skills ? 'input-error' : ''}`}
                  onChange={handleSearch}
                  onFocus={() => setDropdownVisible(true)}  // Show dropdown when input is focused
                />
                {dropdownVisible && (
                  <div className="skills-dropdown">
                    {allSkills
                      .filter(skill => skill.toLowerCase().includes(inputValue.toLowerCase()))
                      .map((skill, index) => (
                        <div
                          key={index}
                          className="skill-option"
                          onClick={() => handleSkillSelect(skill)}
                        >
                          {skill}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {skills.length > 0 && (
                <div className="selected-skills">
                  {skills.map((skill, index) => (
                    <div key={index} className="selected-skill">
                      {skill} 
                      <button onClick={() => removeSkill(skill)}>&times;</button>
                    </div>
                  ))}
                </div>
              )}

              {errors.skills && <small className="error-text">{errors.skills}</small>}
            </div>

            <div className="form-group full-width">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                name="description"
                className={`form-textarea ${errors.description ? 'input-error' : ''}`}
                rows="4"
                placeholder="Describe your project"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {errors.description && <small className="error-text">{errors.description}</small>}

            </div>


            
            <div className='button-wrapper'>
            <button className="form-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Gig...' : 'Create Gig'}
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default CreateGig;
