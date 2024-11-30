const User = require('../models/userModel');

async function userExist(email) {
  const user = await User.findOne({ email });
  if (user) {
    return user;
  }
  return null;
}

async function createUser(req) {
  const newUser = await User.create({
    email: req.emails[0].value,
    role: 'USER',
    firstName: req.name?.givenName,
    lastName: req.name?.familyName,
  });
  return newUser;
}

async function createNewUser(req) {
  const email = req.emails[0].value;
  const user = await userExist(email);
  if (user == null) {
    user = createUser(req);
  }
  return user._id.toString();
}

module.exports = {
  createNewUser,
};
