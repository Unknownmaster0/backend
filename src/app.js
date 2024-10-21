const express = require('express');
const cors = require('cors');
const cookiesParser = require('cookie-parser');

const app = express();

// cors policy
// cors preflight
app.use(
  cors({
    origin: 'http://localhost:5173', // Frontend origin
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies and credentials
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
const { router: jobRouter } = require('./routes/job.route');
const { router: eventRouter } = require('./routes/event.route');
const { router: storyRouter } = require('./routes/story.route');

// declare routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/user/job', jobRouter);
app.use('/api/v1/user/event', eventRouter);
app.use('/api/v1/user/story', storyRouter);

module.exports = {
  app,
};
