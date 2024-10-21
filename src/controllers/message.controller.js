const { Message } = require('../models/message.models');
const { ApiResponse } = require('../utils/ApiResponse');
const { asyncHandler } = require('../utils/asyncHandler');

const sendMessage = asyncHandler(async (req, res) => {
  const { recipientId, content } = req.body;
  const senderId = req.user.id; // Assuming user ID is coming from token

  if (!recipientId || !content) {
    return res
      .status(400)
      .json(new ApiResponse(400, 'RecipientId and senderId is required', ''));
  }

  try {
    const message = await Message.create({
      senderId,
      recipientId,
      content,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, 'Message sent successfully', message));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, 'Failed to send message', ''));
  }
});

const showConversationById = asyncHandler(async (req, res) => {
    
});

module.exports = {
  sendMessage,
  showConversationById,
};
