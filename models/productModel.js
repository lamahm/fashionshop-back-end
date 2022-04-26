const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId
        },
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
        },
        imageUrl: {
            type: String
        }
    }
);

module.exports = mongoose.model('Product', productSchema, 'products');