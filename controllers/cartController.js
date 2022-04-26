const Joi = require('@hapi/joi');
const HttpStatus = require('http-status-codes');
const mongoose = require('mongoose');
const _ = require('lodash');

const Cart = require('../models/cartModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');

module.exports.addToCart = (req, res, next) =>  {

  User.findOne({_id: req._id}).exec().then(user => {
    if (!user) {
      return res.status(409).json({
        message: `invalid user id...`
      });
    }
    Cart
      .find({})
      .exec()
      .then(cart => {
      let newCart = new Cart({
        _id: new mongoose.Types.ObjectId(),
        productName: req.body.name,
        quantity: 1,
        price: req.body.price,
        userId: req._id,
        productId: req.body.productId
      });
      return newCart.save().then(cart => {
        return res.status(200).json(cart);
      })
      .catch(err => {
        return res.status(200).json(err);
      })
    })
    .catch(err => {
      return res.status(200).json(err);
    })
  })
}

module.exports.cartList = (req, res, next) => {
  Cart.findOne({ userId: req._id },
    (err, cart) => {
        if(!cart)
            return res.status(404).json({ status: false, message: 'Cart record not found' });
        else 
            console.log(cart)
            return res.status(200).json({ status: true, cart: _.pick(cart, ['userId']) })
    }   
);
}

module.exports.cartListId = (req, res, next) => {
  const userId = req._id;
  Cart
    .find({ userId: userId })
    .select('name price _id userId')
    .exec()
    .then(cart => {
      if (cart.length < 1) {
        return res.status(404).json({
          message: `no items added yet...`
        });
      }
      return res.status(200).json(cart)
    })
    .catch(err => {
      return res.status(500).json(err);
    });
}
