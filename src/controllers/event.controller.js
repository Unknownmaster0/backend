const { Event } = require('../models/event.models');
const { ApiResponse } = require('../utils/ApiResponse');
const { asyncHandler } = require('../utils/asyncHandler');
const { getUserIdByToken } = require('../utils/getUserId');

const showAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });

  //   if no events to show.
  if (events.length === 0)
    return res.status(200).json(new ApiResponse(200, 'No events to show', ''));

  // send all the events.
  return res
    .status(200)
    .json(new ApiResponse(200, 'All events send successfully', events));
});

const showUserCreatedEvent = asyncHandler(async (req, res) => {
  const userId = await getUserIdByToken(req.headers.authorization);

  const allEvents = await Event.find({ userCreated: userId });

  if (allEvents.length === 0)
    return res
      .status(200)
      .json(new ApiResponse(200, 'You have no any event to show', ''));

  return res
    .status(200)
    .json(new ApiResponse(200, 'send all events successfully', allEvents));
});

const createEvent = asyncHandler(async (req, res) => {
  const {
    time,
    location,
    category,
    contactEmail,
    description,
    linkToJoin,
    date,
    title,
    presenterName,
    presenterLink,
  } = req.body;

  // checking if
  if (
    [
      time,
      category,
      location,
      contactEmail,
      description,
      linkToJoin,
      date,
      title,
      presenterName,
      presenterLink,
    ].some((val) => val?.trim() === '')
  ) {
    // it means required field are not filled.
    return res
      .status(404)
      .json(new ApiResponse(404, 'Fields are necessary to field!', ''));
  }

  //   getting user id.
  const userId = await getUserIdByToken(req.headers.authorization);

  const event = await Event.create({
    time,
    category,
    location,
    contactEmail,
    description,
    linkToJoin,
    date,
    title,
    presenter: {
      name: presenterName,
      socialMediaLink: presenterLink,
    },
    userCreated: userId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, 'Event has been created!', event));
});

module.exports = {
  showAllEvents,
  showUserCreatedEvent,
  createEvent,
};
