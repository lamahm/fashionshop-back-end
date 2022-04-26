const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId
        },
        productName: {
            type: String
        },
        quantity: {
            type: Number,
        },
        price: {
            type: Number
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }
);

module.exports = mongoose.model('Cart', cartSchema, 'cart');