import React, { useEffect, useState } from 'react';
import './Leaderboard.css'; // Optional: for custom styling

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      console.log('Fetching leaderboard data...');
      try {
        const response = await fetch('http://localhost:3000/leaderboard'); // Ensure this is the correct URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Process the data directly since you already have the correct structure
        const sortedLeaderboard = data.map(entry => ({
          username: entry._id, // Assuming _id is treated as username
          totalPoints: entry.totalPoints,
        })).sort((a, b) => b.totalPoints - a.totalPoints); // Sort in descending order

        setLeaderboardData(sortedLeaderboard);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.length > 0 ? (
            leaderboardData.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.totalPoints}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
