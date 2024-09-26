import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Visarts1fin from './asets/Visarts1fin.png';
import './App.css';
import Greeting from './component.js';
import './imageSlider.css';
import NavBar from './navBar.js';
import Join from './Join.js';
import Login from './Login.js';
import Works from './Works.js';
import ImageSlider from './imageSlider.js';
import Contribute from './Contribute.js'; // Importing here for routing
import Leaderboard from './Leaderboard.js'; // Import the Leaderboard component

// Home component for the main landing page
function Home() {
  return (
    <div>
      <img src={Visarts1fin} alt="Visual Arts" className="visual-arts-img" />
      <Greeting name="TENTKOTTA" />
      <ImageSlider />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
            <Route path="/works" element={<Works />} />
            <Route path="/contribute" element={<Contribute />} /> {/* Added route for Contribute */}
            <Route path="/leaderboard" element={<Leaderboard />} /> {/* Added route for Leaderboard */}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
