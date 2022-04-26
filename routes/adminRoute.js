const express = require('express');

const router = express.Router();

const adminController = require('../controllers/adminController');
const jwtHelper = require('../helpers/jwtHelper');

router.get('/admin/getUsers', jwtHelper.verifyJwtToken, adminController.getAllUsers);
router.get('/admin/getProducts', jwtHelper.verifyJwtToken, adminController.getAllProducts);
router.delete('/admin/deleteUser/:username', adminController.deleteUser);
router.delete('/admin/deleteProduct/:_id', adminController.deleteProduct);

module.exports = router; 