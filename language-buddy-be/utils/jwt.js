const jwt = require('jsonwebtoken');
function generateAccessToken(email) {
  return jwt.sign(email, process.env.JWT_SECRET, { expiresIn: '1800s' });
}

function authenticateToken(req) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    throw new Error('Token does not exist');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(err);

    if (err) {
      throw new Error(err);
    }

    req.user = user;
  });
}
module.exports = { generateAccessToken, authenticateToken };
