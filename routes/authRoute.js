const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');
const jwtHelper = require('../helpers/jwtHelper');

router.post('/register', authController.createUser);
router.post('/authenticate', authController.authenticate);
router.post('/authenticateAdmin', authController.authenticateAdmin);
router.get('/userProfile', jwtHelper.verifyJwtToken, authController.userProfile);

module.exports = router;