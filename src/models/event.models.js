const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    contaceEmai: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userCreated: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    linkToJoin: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    presenter: {
      name: {
        type: String,
        required: true,
      },
      linkedinId: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = {
  Event,
};
