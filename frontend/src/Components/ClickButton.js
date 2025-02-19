import React, { useState, useEffect } from 'react';
import './ClickButton.css';

const ClickButton = () => {
  const [totalScore, setTotalScore] = useState(0);
  const [prizesWon, setPrizesWon] = useState(0);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');

  // Generate or retrieve userId from localStorage
  useEffect(() => {
    let storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      // Generate a unique userId (e.g., using a random string)
      storedUserId = `user_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('userId', storedUserId);
    }
    setUserId(storedUserId);
  }, []);

  // Fetch user data on page load
  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    const response = await fetch(`http://localhost:5000/user/${userId}`);
    const data = await response.json();
    setTotalScore(data.totalScore);
    setPrizesWon(data.prizesWon);
  };

  const handleClick = async () => {
    const response = await fetch('http://localhost:5000/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }), // Pass userId to the backend
    });
    const result = await response.json();

    // Update state with the returned data
    setTotalScore(result.totalScore);
    setPrizesWon(result.prizesWon);

    // Display notifications
    let notification = '';
    if (result.scoreToAdd === 10) {
      notification = 'You earned 10 points!';
    } else {
      notification = 'You earned 1 point!';
    }

    if (result.prizeWon) {
      notification += ' You won a prize!';
    }

    setMessage(notification);

    // Clear the notification after 4 seconds
    setTimeout(() => {
      setMessage('');
    }, 4000);
  };

  return (
    <div className="container">
      <h1>Cookie Clicker</h1>
      
      {message && <div className="notification">{message}</div>}

      <div className="scoreboard">
        <p>Total Score: {totalScore}</p>
        <p>Prizes Won: {prizesWon}</p>
      </div>

      <button className="click-button" onClick={handleClick}>
        Click Me!
      </button>
    </div>
  );
};

export default ClickButton;