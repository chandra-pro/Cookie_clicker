const User = require('../models/User');

const getUserInfo = async (userId) => {
 
  const user = await User.findOne({ userId });

  if (!user) {
    return { totalScore: 0, prizesWon: 0 };
  }

  return {
    totalScore: user.totalScore,
    prizesWon: user.prizesWon,
  };
};

module.exports = getUserInfo;