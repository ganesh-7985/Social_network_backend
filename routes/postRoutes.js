const express = require('express');
const { createPost, replyToPost } = require('../controllers/postController');
const { authenticate } = require('../controllers/authController')
const router = express.Router();

router.post('/post',authenticate, createPost);
router.post('/reply',authenticate, replyToPost);

module.exports = router;
