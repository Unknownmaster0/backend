const { Story } = require('../models/story.models');
const { ApiResponse } = require('../utils/ApiResponse');
const { asyncHandler } = require('../utils/asyncHandler');
const { getUserIdByToken } = require('../utils/getUserId');

const showUserCreatedStory = asyncHandler(async (req, res) => {
  const userId = await getUserIdByToken(req.headers.authorization);
  try {
    // getting all stories from db, whose usercreated is the userId.
    const stories = await Story.find({ userCreated: userId });
    return res
      .status(200)
      .json(new ApiResponse(200, 'Stories send successfully', stories));
  } catch (err) {
    console.log(`Error while fetching data from db: ${err}`);
    return res
      .status(500)
      .json(new ApiResponse(500, 'Internal Server issue', ''));
  }
});

const showAllStory = asyncHandler(async (req, res) => {
  try {
    const allStory = await Story.find().sort({ createdAt: -1 });

    if (allStory.length === 0)
      res.status(200).json(new ApiResponse(200, 'No story to show', ''));

    res
      .status(200)
      .json(
        new ApiResponse(200, 'All story send successfully! 😁😁😁', allStory)
      );
  } catch (err) {
    console.log(`error while fetching data from db`);
    console.error(err);
    res.status(500).json(new ApiResponse(500, 'Internal server issue', ''));
  }
});

const createStory = asyncHandler(async (req, res) => {
  try {
    const userId = await getUserIdByToken(req.headers.authorization);
    const { title, content, category, author, date } = req.body;

    // checking if empty, then say that it is required field.
    if (
      [title, category, content, author, date].some((val) => val?.trim() === '')
    ) {
      // it means required field are not filled.
      return res
        .status(404)
        .json(new ApiResponse(404, 'Fields are necessary to field!', ''));
    }

    const story = await Story.create({
      title,
      content,
      category,
      author,
      date,
      userCreated: userId,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, 'Story has been created!', story));
  } catch (err) {
    console.error(`error while storing data to db: ${err}`);
    return res
      .status(500)
      .json(new ApiResponse(500, 'Internal server issue', ''));
  }
});

const showStoryBasedOnId = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const story = await Story.findOne({ _id: id });
    if (!story) {
      // not able to find such story in db.
      return res
        .status(400)
        .json(new ApiResponse(400, 'no such story available', ''));
    }

    return res.status(200).json(new ApiResponse(200, 'Story found', story));
  } catch (err) {
    console.error(`error while fetching data from db: ${err}`);
    return res
      .status(500)
      .json(new ApiResponse(500, 'Internal server issue', ''));
  }
});

module.exports = {
  showUserCreatedStory,
  showAllStory,
  createStory,
  showStoryBasedOnId,
};
