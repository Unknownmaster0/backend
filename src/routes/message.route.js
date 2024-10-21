const { Router } = require('express');
const { authenticateUser } = require('../middlewares/user.middlware');
const {
  sendMessage,
  showConversationById,
} = require('../controllers/message.controller');
const router = Router();

router.route('/').post(sendMessage);
router
  .route('/conversations/:recipientId')
  .get(authenticateUser, showConversationById);

module.exports = {
  router,
};

/* 
const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware"); // Assuming you have an auth middleware

// Route to send a message
router.post("/", protect, messageController.sendMessage);

// Route to get conversation between two users
router.get("/conversations/:recipientId", protect, messageController.getConversation);

module.exports = router;
*/
