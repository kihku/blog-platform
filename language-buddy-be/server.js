const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

const app = express();
dotenv.config({ path: './config.env' });

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
const userRoute = require('./routes/userRoutes');

app.use('/users', userRoute);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
