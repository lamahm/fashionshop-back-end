const express = require('express');
const passport = require('passport');

const router = express.Router();

const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const jwtHelper = require('../helpers/jwtHelper');

router.get('/shop',productController.productList);
router.get('/cart', cartController.cartList);
router.post('/addCart', jwtHelper.verifyJwtToken, cartController.addToCart);
router.get('/cartList', jwtHelper.verifyJwtToken, cartController.cartList);
router.get('/cartListId/:id', jwtHelper.verifyJwtToken, cartController.cartListId);

module.exports = router;