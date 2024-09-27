import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Contribute.css';
import { FaUser, FaHome, FaCog, FaBell, FaQuestionCircle } from 'react-icons/fa';

function Contribute() {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [contributionText, setContributionText] = useState("");

  useEffect(() => {
    const { username: locUsername } = location.state || {};
    if (locUsername) {
      setUsername(locUsername);
      localStorage.setItem("username", locUsername);
    } else {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      } else {
        navigate("/login");
      }
    }
  }, [location, navigate]);

  const handleUserClick = () => {
    navigate('/leaderboard', { state: { username } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/contribute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          contributionText,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.text();
      console.log(result);
      setContributionText("");
    } catch (error) {
      console.error("Error submitting contribution:", error);
    }
  };

  return (
    <div className="contribute">
      <div className="sidebar">
        <ul>
          <li onClick={handleUserClick}><FaUser /></li>
          <li><FaHome /></li>
          <li><FaCog /></li>
          <li><FaBell /></li>
          <li><FaQuestionCircle /></li>
        </ul>
      </div>
      <div className="content">
        <h1>Welcome, {username}!</h1>
        <p>This is the Contribute page.</p>
        <form onSubmit={handleSubmit}>
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