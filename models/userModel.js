const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const jwtConfig = require('../config/secret');

const userSchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId
        },
        username: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        usertype: {
            type: String,
            default: 'user'
        }
    }
);

userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id },
        jwtConfig.jwt_secret,
        {
            expiresIn: jwtConfig.jwt_exp
        });
} 
 
module.exports = mongoose.model('User', userSchema, 'users');