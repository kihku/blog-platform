const User = require('../models/userModel');
const { getUnit } = require('./journeyUnitService');

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
    progress: { unit: { id: null, order: 0 }, lesson: { id: null, order: 0 } },
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
  if (!req.id) {
    throw new Error('Missing user Id');
  }
  const unit = await getUnit({ id: req.unit.id });
  await User.updateOne(
    { _id: req.id },
    {
      $set: {
        progress: {
          lesson: req.lesson,
          unit: {
            id: req.unit.id,
            order: unit.order,
          },
        },
      },
    },
  );
  return true;
}

module.exports = {
  createNewUser,
  updateProgress,
};
