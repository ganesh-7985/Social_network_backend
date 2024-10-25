const express = require('express');
const { createOrJoinCircle } = require('../controllers/circleController');
const { authenticate } = require('../controllers/authController');
const router = express.Router();

router.post('/circle',authenticate, createOrJoinCircle);

module.exports = router;
