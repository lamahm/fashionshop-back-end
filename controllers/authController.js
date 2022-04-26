const Joi = require('@hapi/joi');
const HttpStatus = require('http-status-codes');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const _ = require('lodash');
const mongoose = require('mongoose');

const User = require('../models/userModel');
const Helper = require('../helpers/helper');

module.exports = {
    async createUser(req, res) {
        const schema = Joi.object({
            username: Joi.string().min(2).max(10).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required()
        });

        const { error, value } = schema.validate(req.body);

        if(error) {
            return res.status(HttpStatus.CONFLICT).json(error.details);
        }

        const userName = await User.findOne({
            username: Helper.capitalize(value.username)
        });
        if(userName) {
            return res.status(HttpStatus.CONFLICT).json({
                message: 'Username already exist'
            });
        }

        const userEmail = await User.findOne({
            email: value.email.toLowerCase()
        });
        if(userEmail) {
            return res.status(HttpStatus.CONFLICT).json({
                message: 'Email already exist'
            });
        }

        return bcrypt.hash(value.password, 10, (err, hash) => {
            if(err) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'error occured while hashing password'
                });
            }

            const newUser = {
                _id:  new mongoose.Types.ObjectId(),
                username: Helper.capitalize(value.username),
                email: value.email.toLowerCase(),
                password: hash
            }

            User.create(newUser).then(user => {
                res.status(HttpStatus.CREATED).json({
                    message: 'user created successfully',
                    user
                });
            }).catch(err => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'error occured'
                });
            });
        });
    }
} 

module.exports.authenticate = (req, res, next) => {
    passport.authenticate('jwt-user', (err, user, info) => {
        if(err) return res.status(400).json(err);
        else if(user && (user.usertype == 'user')) return res.status(200).json({ "token": user.generateJwt() });
        else return res.status(404).json(info);
    })(req, res, next);
}

module.exports.authenticateAdmin = (req, res, next) => {
    passport.authenticate('jwt-user', (err, user, info) => {
        if(err) return res.status(400).json(err);
        else if(user && (user.usertype == 'admin')) return res.status(200).json({ "token": user.generateJwt() });
        else return res.status(404).json(info);
    })(req, res, next);
}

module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if(!user)
                return res.status(404).json({ status: false, message: 'User record not found' });
            else 
                return res.status(200).json({ status: true, user: _.pick(user, ['username', 'email']) })
        }   
    );
} 