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
    progress: { unit: 1, lesson: 1 },
  });
  return newUser;
}

async function createNewUser(req) {
  const email = req.emails[0].value;
  let user = await userExist(email);
  if (user == null) {
    user = await createUser(req);
  }
  return user._id.toString();
}

async function updateProgress(req) {
  await User.updateOne({ _id: req.id }, { $set: { progress: req.progress } });
  return true;
}

module.exports = {
  createNewUser,
  updateProgress,
};
