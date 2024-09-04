const { Router } = require('express');
const router = Router();
const {
  showAllEvents,
  showUserCreatedEvent,
  createEvent,
} = require('../controllers/event.controller');
const { authenticateUser } = require('../middlewares/user.middlware');

// route to show all events by any user
router.route('/showAllEvents').get(showAllEvents);

// route to show particular user created event
router
  .route('/showUserCreatedEvent')
  .get(authenticateUser, showUserCreatedEvent);

// route to create event by the user.
router.route('/createEvent').post(authenticateUser, createEvent);

module.exports = {
  router,
};
