// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');

const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const cors = require('cors');

const passport = require('passport');
require('./utils/passport');
const { createNewUser } = require('./services/userService');
const { generateAccessToken } = require('./utils/jwt');

const app = express();

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'session secret',
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('<a href="auth/google">Authenticate with google</a>');
});

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  }),
);

app.get(
  '/auth/google/redirect',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  function (req, res) {
    createNewUser(req.user);
    const token = generateAccessToken({ email: req.user.emails[0].value });
    res.json(token);
  },
);

let corsOptions = {
  origin: ['http://localhost:3000'],
};
app.use(cors(corsOptions));

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB, {}).then(() => {
  console.log('DB connection successful!');
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

const userRoute = require('./routes/userRoutes');
const journeyUnitRoute = require('./routes/journeyUnitRoutes');
const lessonRoute = require('./routes/lessonRoute');
const uploadRoute = require('./routes/uploadRoute');

app.use('/user', userRoute);
app.use('/journeyUnit', journeyUnitRoute);
app.use('/lesson', lessonRoute);
app.use('/upload', uploadRoute);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
