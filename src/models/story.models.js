const mongoose = require('mongoose');

const storySchema = new mongoose.Schema(
  {
    userCreated: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

storySchema.index({ createdAt: -1 });

const Story = mongoose.model('Story', storySchema);

module.exports = {
  Story,
};
