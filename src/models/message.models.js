const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    recipientId: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = {
  Message,
};
