import React, { useState, useEffect } from 'react';
import './Join.css';

function Join() {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    username: '',
    password: '',
    year: '',
    email: '',
    interestedDomains: []
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "interestedDomains") {
      const selectedDomains = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData({ ...formData, interestedDomains: selectedDomains });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    try {
      const response = await fetch('http://localhost:3000/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.text();
      console.log('Server response:', result);
      if (result === 'registered') {
        alert('User registered successfully! Please check your email for verification.');
        setIsRegistered(true);
      } else if (result === 'usernameexists') {
        alert('Username already exists!');
      } else if (result === 'emailexists') {
        alert('Email already exists!');
      } else {
        alert('Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration.');
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    console.log('Verification code submitted:', verificationCode);
    try {
      const response = await fetch('http://localhost:3000/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          verificationCode
        }),
      });

      const result = await response.text();
      console.log('Verification response:', result);
      if (result === 'emailverified') {
        alert('Email verified successfully!');
        setIsVerified(true);
      } else if (result === 'invalidcode') {
        alert('Invalid verification code!');
      } else if (result === 'codeexpired') {
        alert('Verification code expired! Please register again.');
      } else if (result === 'usernotfound') {
        alert('User not found!');
      } else {
        alert('Verification failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during verification.');
    }
  };

  // Scroll Animation effect
  useEffect(() => {
    const form = document.querySelector('form');
    form.classList.add('animate'); // Initial animation

    // Intersection Observer for scroll effect
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          form.classList.add('active'); // Add active class when form is in view
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    });

    observer.observe(form); // Start observing the form

    return () => {
      observer.disconnect(); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="join-container">
      <h1>Join Tentkotta</h1>
      {!isRegistered && !isVerified && (
        <form onSubmit={handleSubmit}>
          {Object.entries(formData).map(([key, value]) => (
            <div className="form-group" key={key}>
              <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              {key === 'interestedDomains' ? (
                <select
                  id={key}
                  name={key}
                  multiple
                  value={value}
                  onChange={handleChange}
                  required
                >
                  <option value="Editing">Editing</option>
                  <option value="Cinematography">Film Making</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Script Writing">Animation</option>
                  {/* Add more options as needed */}
                </select>
              ) : (
                <input
                  type={key === 'password' ? 'password' : key === 'year' ? 'number' : 'text'}
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      )}

      {isRegistered && !isVerified && (
        <form onSubmit={handleVerificationSubmit}>
          <div className="form-group">
            <label htmlFor="verificationCode">Enter 6-digit Verification Code:</label>
            <input
              type="text"
              id="verificationCode"
              name="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </div>
          <button type="submit">Verify Email</button>
        </form>
      )}

      {isVerified && (
        <div>
          <h2>Thank you for verifying your email!</h2>
          <p>You are now a member of the Tentkotta Visual Arts Club.</p>
        </div>
      )}
    </div>
  );
}

export default Join;
