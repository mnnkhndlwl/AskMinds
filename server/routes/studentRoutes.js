const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/post-doubt',studentController.postDoubt);
router.post('/sign',studentController.signIn);
router.post('/login',studentController.logIn);

module.exports = router;