import React, { useEffect } from 'react';
import './App.css';
import baffle from 'baffle'; // Import baffle.js

function Greeting() {
  useEffect(() => {
    const text = baffle(".tentkotta-text");
    text.set({
      characters: '█▓█ ▒░/▒░ █░▒▓/ █▒▒ ▓▒▓/█ ░█▒/ ▒▓░ █<░▒ ▓/░>',
      speed: 120
    });

    // Function to start the baffle animation
    const startBaffle = () => {
      text.start();
      text.reveal(4000); // Reveal the text for 4 seconds
    };

    // Start the animation
    startBaffle();

    // Loop the animation every 5 seconds (adjust as needed)
    const intervalId = setInterval(() => {
      text.reveal(2000); // Reveal again
      text.start(); // Restart the baffle effect
    }, 6000); // Start after 6 seconds (4 seconds reveal + 2 seconds delay)

    // Cleanup function to clear the interval
    return () => {
      clearInterval(intervalId);
      text.reveal(0); // Reset any ongoing animations
    };
  }, []);

  return <h1 className="tentkotta-text">TENTKOTTA</h1>;
}

export default Greeting;
