const { Router } = require('express');
const router = Router();
const { authenticateUser } = require('../middlewares/user.middlware');
const {
  showAllStory,
  showUserCreatedStory,
  createStory,
  showStoryBasedOnId,
} = require('../controllers/story.controller');

// create the story of particular user
router.route('/createStory').post(authenticateUser, createStory);

// show all the story
router.route('/showAllStory').get(showAllStory);

// show all the story from particular user
router
  .route('/showUserCreatedStory')
  .post(authenticateUser, showUserCreatedStory);

// show story based on id.
router.route('/:id').get(showStoryBasedOnId);

module.exports = {
  router,
};
