const Joi = require('@hapi/joi');
const HttpStatus = require('http-status-codes');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const _ = require('lodash');
const mongoose = require('mongoose');

const User = require('../models/userModel');
const Helper = require('../helpers/helper');
const Product = require('../models/productModel');

module.exports.getAllUsers = function (req, res) {
    User.find({}, function (err, user) {
      if(err) {
          res.send("Error in getting car-criteria: " + err);
      }
      res.status(200).json({ status: true, user })
    })
}

module.exports.getAllProducts = function (req, res) {
  Product.find({}, function (err, product) {
    if(err) {
        res.send("Error in getting car-criteria: " + err);
    }
    res.status(200).json({ status: true, product })
  })
}

module.exports.deleteUser = function (req, res) {
  var deleteUser = req.params.username;
  User.findOne({ username: req.params.username }, function(err, user) {
    if(err) throw err;
    if(!user) {
      res.json({ success: false, message: "no user found" })
    } else {
      User.findOneAndRemove({ username: deleteUser }, function(err, user) {
        if(err) throw err;
        res.json({success: true})
      })
    }
  })
}

module.exports.deleteProduct = function (req, res) {
  var deleteProduct = req._id;
  Product.findOne({ _id: req._id }, function(err, product) {
    if(err) throw err;
    if(!product) {
      res.json({ success: false, message: "no product found" })
    } else {
      Product.findOneAndRemove({ _id: deleteProduct }, function(err, product) {
        if(err) throw err;
        res.json({success: true})
      })
    }
  })
} 