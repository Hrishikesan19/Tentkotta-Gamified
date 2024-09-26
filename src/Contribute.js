import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import './Contribute.css';
import { FaUser, FaHome, FaCog, FaBell, FaQuestionCircle } from 'react-icons/fa'; // Using Font Awesome icons

function Contribute() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const [username, setUsername] = useState("Guest"); // Initialize state for username
  const [contributionText, setContributionText] = useState(""); // State to hold contribution text

  useEffect(() => {
    // Retrieve username from local storage if it exists
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      const { username: locUsername } = location.state || {};
      if (locUsername) {
        setUsername(locUsername);
        localStorage.setItem("username", locUsername); // Store in local storage
      }
    }
  }, [location]);

  // Handle click for FaUser icon to navigate to leaderboard
  const handleUserClick = () => {
    navigate('/leaderboard', { state: { username } }); // Navigates to leaderboard page
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await fetch('/contribute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username, // Pass the username
          contributionText, // Pass the contribution text
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.text();
      console.log(result); // Handle success response
      setContributionText(""); // Clear the textarea after submission
    } catch (error) {
      console.error("Error submitting contribution:", error);
    }
  };

  return (
    <div className="contribute">
      <div className="sidebar">
        <ul>
          <li onClick={handleUserClick}><FaUser /></li> {/* Add onClick event */}
          <li><FaHome /></li>
          <li><FaCog /></li>
          <li><FaBell /></li>
          <li><FaQuestionCircle /></li>
        </ul>
      </div>
      <div className="content">
        <h1>Welcome, {username}!</h1>
        <p>This is the Contribute page.</p>
        <form onSubmit={handleSubmit}> {/* Add onSubmit handler */}
          <textarea 
            value={contributionText} 
            onChange={(e) => setContributionText(e.target.value)} 
            placeholder="Share your contribution here" 
            rows="4" 
            cols="50" 
          />
          <br />
          <input type="submit" value="Submit Contribution" />
        </form>
      </div>
    </div>
  );
}

export default Contribute;
