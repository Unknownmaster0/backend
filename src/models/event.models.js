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
    contactEmail: {
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
      socialMediaLink: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

eventSchema.index({ createdAt: -1 });

const Event = mongoose.model('Event', eventSchema);

module.exports = {
  Event,
};
