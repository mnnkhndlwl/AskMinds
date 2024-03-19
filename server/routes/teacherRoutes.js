const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.post('/sign',teacherController.signIn)
router.post("/login", teacherController.logIn);
router.get('/get-doubts/:id',teacherController.getDoubts)
router.put('/accepted',teacherController.accepted)
router.put('/update',teacherController.update)
router.get('/information/:id',teacherController.information)

module.exports = router