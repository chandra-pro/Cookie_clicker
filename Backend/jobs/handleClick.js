const User = require('../models/User');

const handleClick = async (userId) => {
    let scoreToAdd = 1;
    let prizeWon = false;
  
    // 50% chance to get 10 points
    if (Math.random() < 0.5) {
      scoreToAdd = 10;
    }
  
    // 25% chance to win a prize
    if (Math.random() < 0.25) {
      scoreToAdd = 1;  
      prizeWon = true;
    }
  
    // Update user data in the database
    const user = await User.findOneAndUpdate(
      { userId },
      {
        $inc: { totalScore: scoreToAdd, prizesWon: prizeWon ? 1 : 0 },
      },
      { new: true, upsert: true } 
    );
  
    return {
      totalScore: user.totalScore,
      prizesWon: user.prizesWon,
      scoreToAdd,
      prizeWon,
    };
  };

  module.exports = handleClick;