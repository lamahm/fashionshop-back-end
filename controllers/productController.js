const _ = require('lodash');

const Product = require('../models/productModel');

module.exports = {
    async createProduct(req, res) {

        const { error, value } = schema.validate(req.body);

        if(error) {
            return res.status(HttpStatus.CONFLICT).json(error.details);
        }

        const newProduct = {
            id: value.id,
            name: value.name,
            description: value.description,
            price: value.price,
            imageUrl: value.imageUrl
        } 

        return Product.create(newProduct).then(product => {
            res.status(HttpStatus.CREATED).json({
                message: 'Product created successfully',
                product
            });
        }).catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'error occured'
            });
        });
    }
}


module.exports.productList = function (req, res) {
    Product.find({}, function (err, product) {
      if(err) {
          res.send("Error in getting car-criteria: " + err);
      }
      res.status(200).json({ status: true, product })
    })
}

/* (req, res, next) => {
    Product.findOne({ _id: req._id },
        (err, product) => {
            if(!product)
                return res.status(404).json({ status: false, message: 'Product record not found' });
            else 
                return res.status(200).json({ status: true, product })
        }
    ); */
