const express = require('express');
const cors = require('cors');
const cookiesParser = require('cookie-parser');

const app = express();

// cors policy
// cors preflight
app.options(
  '*',
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  })
);

// Use CORS middleware
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  })
);

// important middlwares to be used to receive data from the user.
app.use(express.json({ limit: '20kb' }));
app.use(
  express.urlencoded({
    extended: true,
    limit: '20kb',
  })
);
app.use(express.static('public')); // to store some favicon, pdf, locally on my public folder.
app.use(cookiesParser());

// import routes
const { router: userRouter } = require('./routes/user.route');

// declare routes
app.use('/api/v1/users', userRouter);

module.exports = {
  app,
};
