// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: './config.env' });

const app = express();

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
const uploadRoute = require('./routes/uploadRoute');


app.use('/user', userRoute);
app.use('/journeyUnit', journeyUnitRoute);
app.use('/upload', uploadRoute);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
